import React from "react"
import styled from "styled-components"

const StyledIcon = styled.img`
width: ${props => props.width};
height: ${props => props.height};
    cursor: pointer
`

const Icon = ({ id, src, alt, onClick, size, style }) => <StyledIcon
    id={id}
    src={`../imgs/${src}`}
    alt={alt}
    onClick={onClick}
    width={size ? size.width : "24px"}
    height={size ? size.height : "24px"}
    style={style} />

export default Icon