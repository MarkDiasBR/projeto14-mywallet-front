import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import BASE_URL from "../constants/url";
import axios from 'axios';

export default function SignUpPage() {
  const [form, setForm] = useState({email: "", name: "", password: "" });
  const [disabledInput, setDisabledInput] = useState(false)

  const navigate = useNavigate()

  function handleForm(event) {
    const {name, value} = event.target

    const passwordConfirm = document.querySelector("#pass2-signin");
    if (passwordConfirm.value != document.querySelector("#pass1-signin").value) {
      passwordConfirm.setCustomValidity('Password Must be Matching.');
    } else {
      passwordConfirm.setCustomValidity('');
    }

    setForm({...form, [name]: value})

    console.log(form)
  }

  function handleSubmit(event) {
    event.preventDefault()

    setDisabledInput(true)

    axios.post(`${BASE_URL}/sign-up`, form)
      .then(response => {
        console.log(response.data)
        navigate("/") 
      })
      .catch(error=> {
        console.log(error.response.data)
        setDisabledInput(false)
      })
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input name="name" placeholder="Nome" type="text" onChange={handleForm} disabled={disabledInput} required />
        <input name="email" placeholder="E-mail" type="email" onChange={handleForm} disabled={disabledInput} required />
        <input id="pass1-signin" name="password" placeholder="Senha" type="password" autoComplete="new-password" onChange={handleForm} disabled={disabledInput} required />
        <input id="pass2-signin" name="password" placeholder="Confirme a senha" type="password" autoComplete="new-password" onChange={handleForm} disabled={disabledInput} required />
        <button type="submit" disabled={disabledInput}>Cadastrar</button>
      </form>

      <Link to='/'>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`