import React from "react"
import Card from "./innerPieces/CelebrityCardContainer"
import Name from "./innerPieces/CelebrityName"
import Picture from "./innerPieces/CelebrityPicture"
import Roles from "./innerPieces/CelebrityRoles"
import Details from "./innerPieces/CelebrityDetails"
import BlankArea from "./generic/BlankArea"
import { RemoveButton } from "./innerPieces/Buttons"
import { RemoveIcon, CloseIcon } from "./innerPieces/Icons"
import Logo from "./innerPieces/Logo"
import { cardModes } from "../constants"

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
            return <Roles mode={mode} id="roles">{condenseList(rolesInPreview, roles)}</Roles>
        }
        else {
            return <Roles mode={mode} id="roles">{condenseList(roles.length, roles)}</Roles>
        }
    }

    return (
        <Card
            id={celebrity._id}
            onClick={onClick}
            onMouseEnter={onHover && (ev => onHover(ev.target.id))}
            hoverScale={hoverScale}
            cellHeight={cellHeight}
            mode={mode} >
            <Name id={celebrity.name} mode={mode}>{celebrity.name}</Name>
            {showRoles()}
            <Picture alt={celebrity.name} src={celebrity.pictureURL} mode={mode} />
            {
                mode === cardModes.big &&
                <Details id="details">
                    Find out more @
                    <a href={celebrity.detailsURL}><Logo src="/imgs/imdb_logo.png" width="80px" /></a>
                </Details>
            }
            {
                mode === cardModes.big ?
                    <RemoveButton onClick={() => remove(celebrity._id)} /> :
                    <RemoveIcon onClick={() => remove(celebrity._id)} />
            }
            {
                mode === cardModes.small && <BlankArea></BlankArea>
            }
            {
                mode === cardModes.big &&
                <CloseIcon onClick={callbackForClose} />
            }
        </Card >
    )
}

export default CelebrityCard