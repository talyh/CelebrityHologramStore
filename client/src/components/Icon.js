import React from "react"

const Icon = ({ src, alt, onClick }) => {
    const imgStyle = { width: "24px", cursor: "pointer" }
    return <img src={`../imgs/${src}`} alt={alt} onClick={onClick} style={imgStyle} />
}

export default Icon