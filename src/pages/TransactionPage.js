import styled from "styled-components"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { novaTransacao } from "../services/serverRequisitions"

export default function TransactionsPage() {
  const [form, setForm] = useState({title: "", value: ""});
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  let params;

  if (useParams().tipo === 'entrada') {
    params = {type: 'in', tipo: 'entrada'};
  } else {
    params = {type: 'out', tipo: 'saída'};
  }    

  const bounceOut = (!user)
  useEffect(() => {

    if (bounceOut) {
      navigate("/", {state: {
        errorTitle: "⚠️ ACESSO NÃO PERMITIDO",
        errorMessage: "Faça o login!",
        errorColor: "#F7330E"}})
      return;
    }
  }, []);

  function handleForm(event) {
    const {name, value} = event.target;

    let tempForm = {...form, [name]: value};

    setForm(tempForm);

    console.log(tempForm)
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new Date();
    const dataTrim = data.toLocaleDateString("pt-BR").split("/");
    const dataTransacao = dataTrim[0].concat("/",dataTrim[1]);
    
    let modifiedForm = {...form, date: dataTransacao, value: +(form.value.replaceAll(",","."))};
    console.log('modifiedForm',modifiedForm)

    try {
      await novaTransacao(params, modifiedForm);
      navigate("/home");
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <TransactionsContainer>
      <h1>Nova {params.tipo}</h1>
      <form onSubmit={handleSubmit}>
        <input name="value" placeholder="Valor" pattern="^\d+(?:,\d{1,2})?$" onChange={handleForm} required/>
        <input name="title" placeholder="Descrição" type="text" onChange={handleForm} required/>
        <button>Salvar {params.tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
