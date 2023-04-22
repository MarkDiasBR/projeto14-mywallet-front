import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import MyWalletLogo from "../components/MyWalletLogo"
import axios from 'axios';
import BASE_URL from "../constants/url";

export default function SignInPage() {
  const [form, setForm] = useState({email: "", password: "" });
  const [disabledInput, setDisabledInput] = useState(false);

  const navigate = useNavigate()

  function handleForm(event) {
    const {name, value} = event.target;

    setForm({...form, [name]: value});

    console.log(form)
  }

  function handleSubmit(event) {
    event.preventDefault();

    setDisabledInput(true);

    axios.post(`${BASE_URL}/sign-in`, form)
      .then(response => {
        const token = response.data;
        // setUser({ id, name, image, token })
        localStorage.setItem("token", JSON.stringify({ token }))
        navigate("/home")
      })
      .catch(error => {
        console.log(error.response.data)
        alert(error.response.data)
        setDisabledInput(false)
      })
  }

  return (
    <SingInContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input name="email" placeholder="E-mail" type="email" onChange={handleForm} disabled={disabledInput} required />
        <input name="password" placeholder="Senha" type="password" autocomplete="new-password" onChange={handleForm} disabled={disabledInput} required />
        <button type="submit" disabled={disabledInput}>Entrar</button>
      </form>

      <Link to='/cadastro'>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
