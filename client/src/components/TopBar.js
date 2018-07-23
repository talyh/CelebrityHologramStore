import React from "react"
import Header from "./innerPieces/Header"
import AppTitle from "./innerPieces/AppTitle"
import AppSubtitle from "./innerPieces/AppSubTitle"
import SearchBar from "./SearchBar"

const TopBar = ({ title, subtitle, onSearch, onTitleClick }) => {
    return (
        <Header id="header">
            <AppTitle id="title" onClick={onTitleClick}>{title}</AppTitle>
            <AppSubtitle id="subtitleArea">{subtitle}</AppSubtitle>
            <SearchBar onSearch={onSearch} />
        </Header>
    )
}

export default TopBar