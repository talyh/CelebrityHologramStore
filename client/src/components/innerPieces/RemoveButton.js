import styled from "styled-components"

const RemoveButton = styled.input.attrs({
    type: "button",
    value: "Remove"
})`
    background-color: #790041;
    margin: 0 0 0 auto;
    color: white;
    width: 120px;
    height: 50px;
    font-size: 1em;
    align-self: center;
    cursor: ${props => props.onClick ? "pointer" : "normal"};
`
export default RemoveButton