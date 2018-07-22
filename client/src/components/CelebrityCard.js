import React from "react"
import styled from "styled-components"
import Icon from "./generic/Icon"
import { cardModes } from "../constants"

export const StyledCard = styled.div`
    display: grid;
    grid-template-rows: 2fr 1fr;
    background-color: #E8E8E8;
    -webkit-box-shadow: 8px 8px 6px -6px #777777;
    -moz-box-shadow: 8px 8px 6px -6px #777777;
     box-shadow: 8px 8px 6px -6px #777777;
    cursor:${props => props.onClick ? "pointer" : "normal"};
    height:${props => props.cellHeight}px;
    color: #707070;

    &:hover {
         transform: scale(${props => props.hoverScale}); 
      }
`

const StyledCelebrityCard = StyledCard.extend`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 2fr 2fr 2fr;
    grid-template-areas: "Picture Name Name"
                        "Picture Roles Roles"
                        "Picture . Remove";
    column-gap: 1em;
    padding: 1.5em;
`

const StyledName = styled.h1`
    grid-area: Name;
    font-size: ${props => props.mode === cardModes.small ? "1em" : "2em"};
    pointer-events: none;
`

const StyledRoles = styled.div`
    grid-area: Roles;
    font-size: ${props => props.mode === cardModes.small ? "1em" : "2em"};
    color: #B9B9B9;
    pointer-events: none;
`

const StyledImage = styled.img`
    grid-area: Picture;
    width: ${props => props.mode === cardModes.small ? "100px" : "300px"}
    pointer-events: none;
`

const RemoveIcon = styled(Icon).attrs({
    id: "removeIcon",
    src: "remove.png",
    alt: "Remove",
    style: {
        paddingTop: "1.3em",
        paddingBottom: "0.7em",
        marginLeft: "0.5em",
        marginRight: "0.5em",
        "gridArea": "Remove"
    }
})`
`

const CelebrityCard = ({ celebrity, callbackForRemove, mode, onHover, onClick, hoverScale, cellHeight, rolesInPreview }) => {
    const remove = criteria => fetch(`http://localhost:3001/celebrities?id=${criteria}`, { method: 'DELETE' })
        .then(response => response.ok ? response.json() : handleError(response))
        .then(callbackForRemove)
        .catch(error => handleError(error))

    const handleError = error => console.log(error)

    const condenseList = (itemsToShow, list) => {
        let listSize = itemsToShow

        if (itemsToShow > list.length) {
            listSize = list.length
        }

        let condensedList = []

        for (let i = 0; i < listSize; i++) {
            const newItem = <div id={list[i]} key={list[i]}>{list[i]}</div>
            condensedList = [...condensedList, newItem]
        }

        if (rolesInPreview < list.length) {
            const showMore = <div id="More roles" key="moreRoles"> {`${list.length - itemsToShow} more`}</ div>
            condensedList = [...condensedList, showMore]
        }

        return condensedList
    }


    const showRoles = () => {
        const roles = [...celebrity.roles].sort()
        if (mode === cardModes.small) {
            return <StyledRoles mode={mode} id="roles">{condenseList(rolesInPreview, roles)}</StyledRoles>
        }
        else {
            return <StyledRoles mode={mode} id="roles">{condenseList(roles.length, roles)}</StyledRoles>
        }
    }

    return (
        <StyledCelebrityCard id={celebrity._id} onClick={onClick} onMouseEnter={onHover && (ev => onHover(ev.target.id))} hoverScale={hoverScale} cellHeight={cellHeight} >
            <StyledName id={celebrity.name} mode={mode}>{celebrity.name}</StyledName>
            {showRoles()}
            <StyledImage alt={`${celebrity.name}`} src={celebrity.pictureURL} mode={mode} />
            {mode === cardModes.big && <div>Find out more @ <a href={celebrity.detailsURL}>IMDB</a></div>}
            <RemoveIcon onClick={() => remove(celebrity._id)} />
        </StyledCelebrityCard >
    )
}

export default CelebrityCard