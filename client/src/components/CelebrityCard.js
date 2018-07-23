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
    grid-template-columns:  ${props => props.mode === cardModes.small ? "2fr 2fr 2fr" : "1fr 3fr 1fr"};
    grid-template-areas: ${props => {
        if (props.mode === cardModes.small) {
            return " 'Picture Name Name'              'Picture Roles .'             'Picture Roles Remove' "
        }
        else {
            return " 'Picture Name Close'         'Picture Roles Close'            'Picture More Remove' "
        }
    }};
    column-gap: ${props => props.mode === cardModes.small ? "1em" : "3em"};
    font-size: ${props => props.mode === cardModes.small ? "0.8em" : "1.2em"};
    padding: 1.5em;
`

const StyledName = styled.h1`
    grid-area: Name;   
    pointer-events: none;
`

const StyledRoles = styled.div`
    grid-area: Roles;
    color: #B9B9B9;
    pointer-events: none;
`

const Picture = styled.img`
    grid-area: Picture;
    width: ${props => props.mode === cardModes.small ? "100px" : "200px"};
    padding-top: ${props => props.mode === cardModes.big ? "30px" : "none"};
    pointer-events: none;
`
const CelebrityDetails = styled.div`
    grid-area: More;
`

const RemoveButton = styled.input.attrs({
    type: "button",
    value: "Remove"
})`
    background-color: #790041;
    margin: 0 0 0 auto;
    color: white;
    width: 120px;
    height: 50px;
    font-size: 1em;
    align-self: center;
    cursor: ${props => props.onClick ? "pointer" : "normal"};
`

const RemoveIcon = styled(Icon).attrs({
    id: "removeIcon",
    src: "remove.png",
    alt: "Remove",
    style: {
        paddingTop: "1.3em",
        paddingBottom: "0.7em",
        margin: "0 auto",
        gridArea: "Remove"
    }
})`
`
const CloseIcon = styled(Icon).attrs({
    id: "closeIcon",
    src: "close.png",
    alt: "Close",
    style: {
        gridArea: "Close",
        margin: "0 0 auto auto"
    }
})`
`

const Logo = styled.img`
   grid-area: More;
   padding: 2em 0em 0em 1em;
   transform: translateY(10%);
   align-self: center;
`

const CelebrityCard = ({ celebrity, callbackForRemove, callbackForClose, mode, onHover, onClick, hoverScale, cellHeight, rolesInPreview }) => {
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
        <StyledCelebrityCard
            id={celebrity._id}
            onClick={onClick}
            onMouseEnter={onHover && (ev => onHover(ev.target.id))}
            hoverScale={hoverScale}
            cellHeight={cellHeight}
            mode={mode} >
            <StyledName id={celebrity.name} mode={mode}>{celebrity.name}</StyledName>
            {showRoles()}
            <Picture alt={celebrity.name} src={celebrity.pictureURL} mode={mode} />
            {
                mode === cardModes.big &&
                <CelebrityDetails id="details">
                    Find out more @
                    <a href={celebrity.detailsURL}><Logo src="/imgs/imdb_logo.png" width="80px" /></a>
                </CelebrityDetails>
            }
            {
                mode === cardModes.big ?
                    <RemoveButton onClick={() => remove(celebrity._id)} /> :
                    <RemoveIcon onClick={() => remove(celebrity._id)} />
            }
            {
                mode === cardModes.big &&
                <CloseIcon onClick={callbackForClose} />
            }
        </StyledCelebrityCard >
    )
}

export default CelebrityCard