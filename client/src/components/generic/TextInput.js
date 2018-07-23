import styled from "styled-components"

const TextInput = styled.input.attrs({
    type: "text"
})`
    padding: 3px 0px 3px 3px;
    -webkit-transition: all 0.30s ease-in-out;
    -moz-transition: all 0.30s ease-in-out;
    outline: none;
    margin: 5px 1px 3px 0px;
    border: 1px solid #DDDDDD;
    font-size: 1.2em;
    width: ${ props => props.width || "100%"};
    
    &:focus {
        border: 1px solid rgba(0, 88, 121, 1);
        box-shadow: 0 0 5px rgba(0, 88, 121, 1);
    }

    &:not(:focus) {
        border: ${props => props.valid ? "1px solid rgba(201, 201, 201, 1)" : "1px solid rgba(121, 0, 65, 1)"};
        box-shadow: ${props => props.valid ? "0 0 5px rgba(201, 201, 201, 1)" : "0 0 5px rgba(121, 0, 65, 1)"};
    }
`

export default TextInput