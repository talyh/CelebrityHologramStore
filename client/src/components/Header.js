import React from "react"
import styled from "styled-components"
import SearchBar from "./SearchBar"

const StyledHeader = styled.div.attrs({
    id: "header"
})`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 4fr 1fr;
    grid-template-areas: "Title Title Title Title Title"
                        "Subtitle Subtitle Subtitle Search Search";
    padding: 20px;
    position: fixed;
    z-index: 1;
    left:0;
    right:0;
    background-color:#005879;
    color:white;
`

const StyledTitle = styled.h1.attrs({
    id: "title"
})`
    grid-area: Title;   
    margin-top: 0;
    font-family: 'Courgette', cursive;
    cursor: ${props => props.onClick ? "pointer" : 'normal'};
`

const StyledSubTitle = styled.h2.attrs({
    id: "subtitleArea"
})`
    grid-area: Subtitle;
    height:2em;
    line-height:2em;
    white-space:nowrap;
    font-size: 1em;
`

const Header = ({ title, subtitle, onSearch, onTitleClick }) => {
    return (
        <StyledHeader>
            <StyledTitle onClick={onTitleClick}>{title}</StyledTitle>
            <StyledSubTitle>{subtitle}</StyledSubTitle>
            <SearchBar onSearch={onSearch} />
        </StyledHeader>
    )
}

export default Header