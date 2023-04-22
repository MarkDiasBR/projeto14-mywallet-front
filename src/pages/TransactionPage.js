import styled from "styled-components"
import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react";
import BASE_URL from "../constants/url";
import axios from 'axios'

export default function TransactionsPage() {
  const [form, setForm] = useState({title: "", value: ""});
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("user")).token;

  let params;

  if (useParams().tipo === 'entrada') {
    params = {type: 'in'};
  } else {
    params = {type: 'out'};
  }

  const config = { "headers": {"Authorization": `Bearer ${token}`} }

  function handleForm(event) {
    const {name, value} = event.target;

    let tempForm = {...form, [name]: value};

    setForm(tempForm);

    console.log(tempForm)
  }

  function handleSubmit(event) {
    event.preventDefault();

    const data = new Date;
    const dataTrim = data.toLocaleDateString("pt-BR").split("/");
    const dataTransacao = dataTrim[0].concat("/",dataTrim[1]);
    
    let modifiedForm = {...form, date: dataTransacao, value: +(form.value.replaceAll(",","."))};
    console.log('modifiedForm',modifiedForm)

    axios.post(`${BASE_URL}/new-transaction/${params.type}`, modifiedForm, config)
      .then(response => {
        console.log(response.data)
        // const token = response.data;
        // setUser({ id, name, image, token })
        // localStorage.setItem("user", JSON.stringify({ token }));
        navigate("/home")
      })
      .catch(error => {
        console.log(error.response.data)
        alert(error.response.data)
      })
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={handleSubmit}>
        <input name="value" placeholder="Valor" pattern="^\d+(?:,\d{1,2})?$" onChange={handleForm} required/>
        <input name="title" placeholder="Descrição" type="text" onChange={handleForm} required/>
        <button>Salvar TRANSAÇÃO</button>
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
