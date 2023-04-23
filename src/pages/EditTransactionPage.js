import styled from "styled-components"
import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react";
import { editarTransacao } from "../services/serverRequisitions"

export default function EditTransactionPage() {
  const [form, setForm] = useState({title: "", value: ""});
  const navigate = useNavigate();

  const params = { ...useParams(), type: useParams().tipo };

  if (params.tipo === 'in') {
    params.tipo = 'entrada'
  } else {
    params.tipo = 'saída'
  }

  function handleForm(event) {
    const {name, value} = event.target;

    let tempForm = {...form, [name]: value};

    setForm(tempForm);

    console.log(tempForm)
  }

  async function handleSubmit(event) {
    event.preventDefault();

    let modifiedForm = {...form, value: +(form.value.replaceAll(",","."))};
    console.log('modifiedForm',modifiedForm)

    try {
      await editarTransacao(params.id, modifiedForm);
      navigate("/home");
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <TransactionsContainer>
      <h1>Editar {params.tipo}</h1>
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