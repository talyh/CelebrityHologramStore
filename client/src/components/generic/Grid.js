import styled from "styled-components"

const Grid = styled.div.attrs({
    id: `${props => props.id}`
})`
    display: grid;
    grid-template-rows: repeat(${props => props.rows}, 1fr);
    grid-template-columns: repeat(${props => props.columns}, 1fr);
    column-gap: ${props => props.columnGap}em;
    row-gap: ${props => props.rowGap}em;
    cursor: "pointer";
`

export default Grid