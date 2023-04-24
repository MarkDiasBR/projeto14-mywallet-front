import styled from "styled-components"

export default function MensagemErro({ url }) {
    return (
        <Paragrafo>
            ~{url} 
            <br/>
            Página não encontrada
            <br/><br/>
            A URL que você está tentando acessar não foi encontrada em nosso servidor.
            <br/><br/>
            Verifique se digitou corretamente a URL ou tente navegar para outra página em nossa aplicação.
            <br/><br/>
            Suporte:
            <br/>
            <a href="https://github.com/MarkDiasBR">GitHub @MarkDiasBR</a>
        </Paragrafo>
    )
}

const Paragrafo = styled.p`
    margin-top: 48px !important;
    font-size: 18px !important;
    line-height: 22px !important;
    color: #fff !important;
`