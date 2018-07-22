import styled from "styled-components"

const Grid = styled.div.attrs({
    id: `${props => props.id}`
})`
    display: grid;
    grid-template-rows: repeat(${props => props.rows}, 1fr);
    grid-template-columns: repeat(${props => props.columns}, 1fr);
    cursor: "pointer";
`

export default Grid