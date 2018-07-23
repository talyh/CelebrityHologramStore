import styled from "styled-components"

const Button = styled.input.attrs({
    type: "button",
    value: `${props => props.value}`
})`
    background-color: ${props => props.color || "#005879"};
    margin: 0 0 0 auto;
    color: white;
    width: 120px;
    height: 50px;
    font-size: 1em;
    align-self: center;
    cursor: ${props => props.onClick ? "pointer" : "normal"};
`
export default Button