import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"

export default function SignInPage() {


  function handleSubmit(event) {
    event.preventDefault()

    setDisabledInput(true)

    axios.post(`${BASE_URL}/auth/login`, form)
      .then(response => {
        const { id, name, image, token } = response.data
        console.log({ id, name, image, token })
        setUser({ id, name, image, token })
        localStorage.setItem("user", JSON.stringify({ id, name, image, token }))
        navigate("/hoje")
      })
      .catch(error => {
        alert(error.response.data.message)
        setDisabledInput(false)
      })
  }

  return (
    <SingInContainer>
      <form>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" />
        <input placeholder="Senha" type="password" autocomplete="new-password" />
        <button>Entrar</button>
      </form>

      <Link to='/cadastre-se'>
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
