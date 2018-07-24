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

class CelebrityCard extends Component {
    state = {
        confirmRemoval: false
    }

    remove = event => {
        event && event.stopPropagation()

        fetch(`http://localhost:3001/celebrities?id=${this.props.celebrity._id}`, { method: 'DELETE' })
            .then(response => response.ok ? response.json() : this.handleError(response))
            .then(this.props.callbackForRemove)
            .catch(error => this.handleError(error))
    }

    handleError = error => console.log(error)

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
                {
                    mode === cardModes.details &&
                    <Details id="details">
                        Find out more @
                    <a href={celebrity.detailsURL}><Logo src="/imgs/imdb_logo.png" width="80px" /></a>
                    </Details>
                }
                {
                    mode === cardModes.details ?
                        <RemoveButton onClick={this.confirmRemoval} /> :
                        <RemoveIcon onClick={this.remove} />
                }
                {
                    mode === cardModes.preview && <BlankArea></BlankArea>
                }
                {
                    mode === cardModes.details &&
                    <CloseIcon onClick={callbackForClose} />
                }

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