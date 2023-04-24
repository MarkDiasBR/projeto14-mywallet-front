import { useLocation } from "react-router-dom";
import MensagemErro from "./MensagemErro"
import styled from "styled-components"

export default function ErroPage() {
  const location = useLocation();

  return (
    <TransactionsContainer>
      <p><strong>ERRO 404 😵</strong></p>
      <MensagemErro url={location.pathname}/>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #fff;
  font-size: 48px;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`