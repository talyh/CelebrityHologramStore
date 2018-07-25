import React from "react"
import Header from "./innerPieces/Header"
import AppTitle from "./innerPieces/AppTitle"
import AppSubtitle from "./innerPieces/AppSubTitle"
import SearchBar from "./SearchBar"

// provide a top bar with a title, subtitle and search bar
const TopBar = ({ title, subtitle, onSearch, onTitleClick }) => {
    return (
        <Header id="header">
            <AppTitle id="title" onClick={onTitleClick}>{title}</AppTitle>
            <AppSubtitle id="subtitle">{subtitle}</AppSubtitle>
            <SearchBar onSearch={onSearch} />
        </Header>
    )
}

export default TopBar