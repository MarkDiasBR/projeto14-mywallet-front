import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import BASE_URL from "../constants/url"
import axios from 'axios'

export default function HomePage() {
  const [transacoes, setTransacoes] = useState([])

  const token = JSON.parse(localStorage.getItem("user")).token;
  console.log("meu token é", token)

  useEffect(() => {
    const config = { "headers": {"Authorization": `Bearer ${token}`} };

    axios.get(`${BASE_URL}/transactions`, config)
    .then(response=>{
        console.log("A")
        console.log(response.data)
        setTransacoes(response.data)
    })
    .catch(err=>console.log(err.response.data))
  }, [])

  const somaSaldo = (acc, obj) => {
    console.log("entry:",obj.type === "in" ? obj.value : (-1)*obj.value)
    return obj.type === "in" ? acc + obj.value : acc - obj.value
  }

  const moneify = (num, bool) => {

    const answer = num.toLocaleString('pt-BR', {style: "currency", currency: "BRL"});

    if (!bool) {
      return answer.replace("R$","");
    }
    
    return answer;
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, Fulano</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {transacoes.map(transacao => (
            <ListItemContainer key={transacao._id}>
              <div>
                <span>{transacao.date}</span>
                <strong>{transacao.title}</strong>
              </div>
              <Value color={transacao.type === "in" ? "positivo" : "negativo"}>
                {moneify(transacao.value, false)}
              </Value>
            </ListItemContainer>
          ))}
          <ListItemContainer>
            <div>
              <span>30/11</span>
              <strong>Almoço mãe</strong>
            </div>
            <Value color={"negativo"}>120,00</Value>
          </ListItemContainer>

          <ListItemContainer>
            <div>
              <span>15/11</span>
              <strong>Salário</strong>
            </div>
            <Value color={"positivo"}>3000,00</Value>
          </ListItemContainer>
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"}>
            {transacoes.length > 0 && moneify(transacoes.reduce(somaSaldo,0), true)}
          </Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <Link to="/nova-transacao/entrada">
          <button>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </Link>
        <Link to="/nova-transacao/saida">
          <button>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </button>
        </Link>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`