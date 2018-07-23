import React from "react"
import styled from "styled-components"

const smallIcon = { width: "24px", height: "24px" }
const mediumIcon = { width: "42px", height: "42px" }
const largeIcon = { width: "60px", height: "60px" }

const StyledIcon = styled.img`
    width: ${props => {
        if (props.large) return largeIcon.width;
        if (props.medium) return mediumIcon.width;
        return smallIcon.width;
    }};
    height: ${props => {
        if (props.large) return largeIcon.height;
        if (props.medium) return mediumIcon.height;
        return smallIcon.height;
    }};
    cursor: pointer
`

const Icon = ({ id, src, alt, onClick, style, small, medium, large }) => <StyledIcon
    id={id}
    src={`../imgs/${src}`}
    alt={alt}
    onClick={onClick}
    style={style}
    small={small}
    medium={medium}
    large={large} />

export default Icon