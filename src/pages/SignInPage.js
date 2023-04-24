import styled from "styled-components"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react";
import MyWalletLogo from "../components/MyWalletLogo"
import { signIn } from "../services/serverRequisitions";
import { AnimatedContainer, AlertDiv } from "./styled";
import AlertContainer from "./AlertContainer";

export default function SignInPage() {
  const [classGone, setClassGone] = useState("")
  const { state } = useLocation();

  const [form, setForm] = useState({email: "", password: "" });
  const [disabledInput, setDisabledInput] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    if (state) {
      setTimeout(() => {
        setClassGone("gone")
      }, 3000);
    }
  }, [])

  function handleForm(event) {
    const {name, value} = event.target;

    setForm({...form, [name]: value});

    console.log(form)
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setDisabledInput(true);
  
    try {
      const { name, token } = await signIn(form)
      try {
        localStorage.setItem("user", JSON.stringify({ name, token }));
      } catch (err) {
        console.log(err.response.data)
      } finally {
        navigate("/home")
      }

    } catch (err) {
      console.log(err.response.data)
      setDisabledInput(false)
    }
    

    // axios.post(`${BASE_URL}/sign-in`, form)
    //   .then(response => {
    //     const { name, token } = response.data;
    //     console.log("oi");
    //     console.log(form)
    //     console.log("form acima")
    //     // setUser({ id, name, image, token })
    //     // console.log('requisition.body',requisition.body)
    //     localStorage.setItem("user", JSON.stringify({ name, token }));
    //     navigate("/home")
    //   })
    //   .catch(error => {
    //     console.log(error.response.data)
    //     alert(error.response.data)
    //     setDisabledInput(false)
    //   })
  }

  function ErrorAlert(props) {
    return (
      <>
        <p>{props.errorTitle}</p>
        <p>{props.errorMessage}</p>
      </> 
    )
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

      <AnimatedContainer className={`${classGone}`}>
        <AlertContainer>
          {state && (
            <AlertDiv errorColor={state.errorColor}>
              <ErrorAlert errorMessage={state.errorMessage} errorTitle={state.errorTitle}/>
            </AlertDiv>
          )}
        </AlertContainer>            
      </AnimatedContainer>
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
