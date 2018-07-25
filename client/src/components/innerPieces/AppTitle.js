import styled from "styled-components"

// provide a styled title
const AppTitle = styled.h1`
    grid-area: Title;   
    margin-top: 0;
    font-family: 'Courgette', cursive;
    cursor: ${props => props.onClick ? "pointer" : 'normal'};
`

export default AppTitle