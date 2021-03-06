import React, { Component } from "react"
import Card from "./innerPieces/CelebrityCardContainer"
import Name from "./innerPieces/CelebrityName"
import Picture from "./innerPieces/CelebrityPicture"
import Roles from "./innerPieces/CelebrityRoles"
import Details from "./innerPieces/CelebrityDetails"
import BlankArea from "./generic/BlankArea"
import { RemoveButton } from "./innerPieces/Buttons"
import { RemoveIcon, CloseIcon } from "./innerPieces/Icons"
import { ConfirmationModal } from "./innerPieces/Modals"
import Logo from "./innerPieces/Logo"
import { cardModes } from "../constants"
import remove from "../operations/deleteRecord"

// provide a card to display a specific celebrity, to be shown in either preview or details mode based off props
class CelebrityCard extends Component {
    state = {
        confirmRemoval: false
    }

    remove = event => {
        // prevent further events from being registered, to allow interaction with elements of the card even in preview mode
        event && event.stopPropagation()

        remove(`/celebrities?id=${this.props.celebrity._id}`,
            () => this.props.callbackForRemove(),
            error => console.log("Error: ", error)
        )
    }

    // check if a list has more items than should be shown in preview and return a condensed version of it
    condenseList = (itemsToShow, list) => {
        let listSize = itemsToShow

        if (itemsToShow > list.length) {
            listSize = list.length
        }

        let condensedList = []

        for (let i = 0; i < listSize; i++) {
            const newItem = <div id={list[i]} key={list[i]}>{list[i]}</div>
            condensedList = [...condensedList, newItem]
        }

        if (this.props.rolesInPreview < list.length) {
            const showMore = <div id="More roles" key="moreRoles"> {`${list.length - itemsToShow} more`}</ div>
            condensedList = [...condensedList, showMore]
        }

        return condensedList
    }

    // display sorted roles, respecting the limit to be shown in preview mode
    showRoles = () => {
        const { celebrity, rolesInPreview, mode } = this.props
        const roles = [...celebrity.roles].sort()
        if (mode === cardModes.preview) {
            return <Roles mode={mode} id="roles">{this.condenseList(rolesInPreview, roles)}</Roles>
        }
        else {
            return <Roles mode={mode} id="roles">{this.condenseList(roles.length, roles)}</Roles>
        }
    }

    // offer confirmation of removal
    confirmRemoval = event => {
        event && event.stopPropagation()
        this.setState({ confirmRemoval: true })
    }

    stay = event => {
        event && event.stopPropagation()
        this.setState({ confirmRemoval: false })
    }

    render() {
        const { celebrity, callbackForClose, mode, onHover, onClick, hoverScale, cellHeight } = this.props

        // render a card with properties based off the mdoe (preview or details)
        return (
            <Card
                id={celebrity._id}
                onClick={onClick}
                onMouseOver={onHover && (ev => onHover(ev.target.id))}
                hoverScale={hoverScale}
                cellHeight={cellHeight}
                mode={mode} >
                <Name id={celebrity.name} mode={mode}>{celebrity.name}</Name>
                {this.showRoles()}
                <Picture alt={celebrity.name} src={celebrity.pictureURL} mode={mode} />
                {/* only show details if in details mode */}
                {
                    mode === cardModes.details &&
                    <Details id="details">
                        Find out more @
                    <a href={celebrity.detailsURL}><Logo src="/imgs/imdb_logo.png" width="80px" /></a>
                    </Details>
                }
                {/* on details mode, show remove button with confirmation
                on preview mode, show a remove icon without confirmation */}
                {
                    mode === cardModes.details ?
                        <RemoveButton onClick={this.confirmRemoval} /> :
                        <RemoveIcon onClick={this.remove} />
                }
                {/* on preview mode, add a blank area to help the grid distribution */}
                {
                    mode === cardModes.preview && <BlankArea></BlankArea>
                }
                {/* on details mode, show a close icon */}
                {
                    mode === cardModes.details &&
                    <CloseIcon onClick={callbackForClose} />
                }

                {/* if needed, show a modal to confirm removal */}
                {
                    this.state.confirmRemoval &&
                    <ConfirmationModal
                        message={`Confirm removal?`}
                        onCancel={this.stay}
                        onConfirm={this.remove} />
                }
            </Card >
        )
    }
}

export default CelebrityCard