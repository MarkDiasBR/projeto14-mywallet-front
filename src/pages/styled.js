import styled from "styled-components";

export const AlertDiv = styled.div`
    margin: 25px auto 0;
    padding: 9px;
    width: calc(100vw - 72px);
    outline-offset: -5px;
    outline: 2px solid white;
    border-radius: 5px;
    max-width: 450px;
    height: 80px;
    background-color: ${props=>props.errorColor};
    color: #FFFFFF;
    font-family: 'Lexend Deca', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    transition: opacity 1000ms;
`

 export const AnimatedContainer = styled.div`
    opacity: 1;
    transition: opacity 0.5s 0.5s ease-in-out;
    &.gone {
        opacity: 0;
    }
 `