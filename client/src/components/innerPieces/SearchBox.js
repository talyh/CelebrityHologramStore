import styled from "styled-components"

const SearchBox = styled.input.attrs({
    id: "searchBox",
    type: "text"
})`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 100%;
    font-size: 1em;
`

export default SearchBox