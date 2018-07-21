import React from "react"
import SearchBar from "./SearchBar"

const Header = ({ title, subtitle, onSearch, onTitleClick }) => {
    const dummyStyle = { cursor: "pointer" }

    return <div>
        <h1 style={dummyStyle} onClick={onTitleClick}>{title}</h1>
        <h2>{subtitle}</h2>
        <SearchBar onSearch={onSearch} />
    </div>
}

export default Header