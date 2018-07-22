import React from "react"
import styled from "styled-components"
import Icon from "./generic/Icon"
import { cardModes } from "../constants"

const StyledCard = styled.div.attrs({
})`
    padding: 2em;
    background-color: #E8E8E8;
    cursor:${props => props.onClick ? "pointer" : "normal"};
`

const StyledName = styled.h1.attrs({
})`
    color: #707070;
    pointer-events: none;
`

const StyledRole = styled.div.attrs({
})`
    color: #B9B9B9;
    pointer-events: none;
`

const StyledImage = styled.img`
    pointer-events: none;
`

const CelebrityCard = ({ celebrity, callbackForRemove, mode, onHover, onClick }) => {
    const remove = criteria => fetch(`http://localhost:3001/celebrities?id=${criteria}`, { method: 'DELETE' })
        .then(response => response.ok ? response.json() : handleError(response))
        .then(callbackForRemove)
        .catch(error => handleError(error))

    const handleError = error => console.log(error)

    const showRoles = () => {
        const roles = celebrity.roles.sort()
        if (mode === cardModes.small) {
            return (
                <div>
                    <StyledRole id={roles[0]}>{roles[0]}</StyledRole>
                    {roles.length > 1 && <StyledRole id="More roles">{`${roles.length - 1} more`}</StyledRole>}
                </div>
            )
        }
        else {
            return roles.map(role => <StyledRole id={role} key={role}>{role}</StyledRole>)
        }
    }

    return (
        <StyledCard id={celebrity._id} onClick={onClick} onMouseEnter={onHover && (ev => onHover(ev.target.id))} >
            <StyledName id={celebrity.name}>{celebrity.name}</StyledName>
            {showRoles()}
            <StyledImage alt={`${celebrity.name}`} src={celebrity.pictureURL} />
            {mode === cardModes.big && <div>Find out more @ <a href={celebrity.detailsURL}>IMDB</a></div>}
            <Icon src="remove.png" alt="Remove" onClick={() => remove(celebrity._id)} />
        </StyledCard >
    )
}

export default CelebrityCard