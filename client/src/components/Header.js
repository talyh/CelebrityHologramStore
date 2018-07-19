import React from "react"
import SearchBar from "./SearchBar"

const Header = ({ title, subtitle, onSearch }) => {
    return <div>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <SearchBar onSearch={onSearch} />
    </div>
}

export default Header