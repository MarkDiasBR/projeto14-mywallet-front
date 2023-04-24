import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { pegarTransacoes, deleteTransacao } from "../services/serverRequisitions"

export default function HomePage() {
  const [transacoes, setTransacoes] = useState([])
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  

  useEffect(() => {

    async function init() {
      try {
        const response = await pegarTransacoes();
        setTransacoes(response);
        if (document.querySelector('#transactions-container > li:last-child') !== null) {
          document.querySelector('#transactions-container > li:last-child').scrollIntoView({ behavior: 'smooth' })
        }
      } catch (err) {
        console.log(err)
      }
    }

    init();
  }, []);

  const somaSaldo = (acc, obj) => {
    return obj.type === "in" ? acc + obj.value : acc - obj.value
  }

  const moneify = (num, bool) => {

    const answer = num.toLocaleString('pt-BR', {style: "currency", currency: "BRL"});

    if (!bool) {
      return answer.replace("R$","");
    }
    
    return answer;
  }

  function DeleteButton({ id }) {

    async function handleDeleteButton(id) {
      if (window.confirm("Tem certeza que quer apagar esta entrada?")) {
        try {
          await deleteTransacao(id);
          const response = await pegarTransacoes();
          setTransacoes(response);
        } catch (err) {
          console.log(err.response.data)
        }
      }
    }
    
    return (
      <button onClick={()=>handleDeleteButton(id)}>
        x
      </button>
    )
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <BiExit onClick={handleLogout}/>
      </Header>

      <TransactionsContainer>
        <ul id="transactions-container">
          {transacoes.map(transacao => (
            <ListItemContainer key={transacao._id}>
              <div>
                <span>{transacao.date}</span>
                <Link to={`/editar-registro/${transacao.type}/${transacao._id}`} state={{value:transacao.value, title:transacao.title}}>
                  <strong>{transacao.title}</strong>
                </Link>
              </div>
              <div>
                <Link to={`/editar-registro/${transacao.type}/${transacao._id}`} state={{value:transacao.value, title:transacao.title}}>
                  <Value color={transacao.type === "in" ? "positivo" : "negativo"}>
                    {`${transacao.type === "out" ? "-" : ""}${moneify(transacao.value, false).trim()}`}
                  </Value>                
                </Link>   
                <DeleteButton id={transacao._id} />
              </div>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={transacoes.reduce(somaSaldo,0) >= 0
                        ? "positivo"
                        : "negativo"}>
            {transacoes.length > 0 && 
            moneify(transacoes.reduce(somaSaldo,0), true)
            }
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
  min-height: 94vh;
  height: max-content;
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

  /* background: yellow; */
  article {
    display: flex;
    /* background: red; */
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
  ul {
    height: calc(100vh - 290px);
    overflow-y: scroll;
    width: calc(100%);
    padding-right: 16px;
    /* background: blue; */
  }
  
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  & > a {
    padding-top: 0px;
    width: 100%;
  };
  
  button {
    /* width: calc(50vw - 32px); */
    width: 100%;
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
  color: ${(props) => (props.color === "positivo" ? "green" : "#F7330E")};
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
  div:last-child {
    display: flex;
    align-items: center;

  }
  button {
    padding: 0;
    position: relative;
    left: 10px;
    bottom: 2px;
    color: #C6c6c6;
    background-color: transparent;
  }
  & > div > a {
    font: inherit;
    color: #000000;
    padding: 0;
  }
`