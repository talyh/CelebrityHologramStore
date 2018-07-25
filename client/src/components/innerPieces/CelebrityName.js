import styled from "styled-components"

// provide a styled display of the celebrity name
const CelebrityName = styled.h1`
    grid-area: Name;   
    margin-top: 0;
    pointer-events: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export default CelebrityName