import React, { Component } from "react"
import styled from "styled-components"
import Card from "./innerPieces/CelebrityCardContainer"
import TextInput from "./generic/TextInput"
import Picture from "./innerPieces/CelebrityPicture"
import { AddIcon, RemoveIcon } from "./innerPieces/Icons"
import { SaveButton, CancelButton } from "./innerPieces/Buttons"
import { MessageModal, ConfirmationModal } from "./innerPieces/Modals"
import { cardModes } from "../constants"
import save from "../operations/saveRecord"

// set styles that are very specific to this component's presentation
const PictureInputArea = styled.div`
    grid-Area: Picture;
`

const NameInputArea = styled.div`
    grid-Area: Name;
`

const RolesInputArea = styled.div`
    grid-Area: Roles;
    margin-bottom: 1em;
`

const DetailsInputArea = styled.div`
    grid-Area: More;
`

const ButtonsArea = styled.div`
    grid-Area: Buttons;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1em;
`

class InsertForm extends Component {
    // determine state, with each property having a value and a boolean to indicate whether the value is valid,
    // as well as controls to determine when to show alerts
    state = {
        name: {
            value: "",
            valid: false
        },
        picture: {
            url: "",
            valid: false
        },
        details: {
            url: "",
            valid: false
        },
        roles: {
            value: [""],
            valid: false
        },
        confirmSave: false,
        confirmCancel: false
    }

    // adjust name properties as needed
    changeName = ev => this.setState({ name: { ...this.state.name, value: ev.target.value } })
    blurName = ev => this.validateName(ev.target.value)
    validateName = name => {
        let valid = false

        if (name) {
            valid = true
        }

        this.setState({ name: { ...this.state.name, valid: valid } })
    }

    // adjust picture properties as needed
    changePicture = ev => {
        // because the image display relies on validity, if an image is being displayed and the url changes
        // we want to validate whether we should continue displaying it
        if (this.state.picture.valid) {
            this.validatePictureURL(this.state.picture.url)
        }

        this.setState({ picture: { ...this.state.picture, url: ev.target.value } })
    }
    blurPicture = ev => this.validatePictureURL(ev.target.value)
    validatePictureURL = url => {
        // callback to be executed once the image loads or errors out
        const updateState = valid => this.setState({ picture: { ...this.state.picture, valid: valid } })

        // create a new Image object with the url, assigning the setState to the error and load
        const img = new Image()
        img.src = url
        img.onerror = img.onabort = () => { updateState(false) }
        img.onload = () => { updateState(true) }
    }

    // adjust details properties as needed
    changeDetails = ev => this.setState({ details: { ...this.state.details, url: ev.target.value } })
    blurDetails = ev => this.validateDetailsURL(ev.target.value)
    validateDetailsURL = url => {
        // determine the RegEx pieces
        var domain = '((?:[a-z][a-z\\.\\d\\-]+)\\.(?:[a-z][a-z\\-]+))(?![\\w\\.])'
        var details = '.*?\\/.*?(\\/)(nm)'

        // create a new RegEx, testing the url agains it
        const urlFormat = new RegExp(domain + details);
        let valid = false
        if (urlFormat.test(url)) {
            valid = true
        }

        this.setState({ details: { ...this.state.details, valid: valid } })
    }

    // adjust roles properties as needed
    addRole = () => this.setState({ roles: { ...this.state.roles, value: [...this.state.roles.value, ""] } })
    changeRole = (index, ev) => this.setState({
        roles: {
            ...this.state.roles,
            value: [
                ...this.state.roles.value.slice(0, index),
                ev.target.value,
                ...this.state.roles.value.slice(index + 1)
            ]
        }
    })
    blurRole = ev => this.validateRoles(this.state.roles.value)
    removeRole = (index, ev) => this.setState({
        roles: {
            ...this.state.roles,
            value: [
                ...this.state.roles.value.slice(0, index),
                ...this.state.roles.value.slice(index + 1)
            ]
        }
    })
    validateRoles = roles => {
        let valid = false

        if (roles.length > 0) {
            if (roles.filter(role => role).length > 0) {
                valid = true
            }
        }

        this.setState({ roles: { ...this.state.roles, valid: valid } })
    }

    validateForm = () => {
        // rerun validations as a failsafe
        this.validateName(this.state.name.value)
        this.validateRoles(this.state.roles.value)
        this.validateDetailsURL(this.state.details.url)
        this.validatePictureURL(this.state.picture.url)

        const valid = this.state.name.valid
            && this.state.roles.valid
            && this.state.details.valid
            && this.state.picture.valid

        return valid
    }

    // verify if any of the relevate properties have been filled
    checkForData = () => (this.state.name.value || this.state.picture.url || this.state.roles.value[0] || this.state.details.url)

    // if data has been entered, confirm cancellation, otherwise, cancel
    cancel = () => this.checkForData() ? this.setState({ confirmCancel: true }) : this.props.onCancel()

    stay = () => this.setState({ confirmCancel: false })

    save = () => {
        // validate the form, showing the confirmation on successful save or logging the error on failure
        if (this.validateForm()) {
            save(`/celebrities?name=${this.state.name.value}&roles=${JSON.stringify(this.state.roles.value)}&pictureURL=${this.state.picture.url}&detailsURL=${this.state.details.url}`,
                () => this.setState({ confirmSave: true }),
                error => console.log(error)
            )
        }
    }

    render() {
        return (
            // render a card in insertion mode
            <Card mode={cardModes.insertion}>
                <NameInputArea>
                    <TextInput placeholder="Enter a celebrity name" valid={this.state.name.valid} value={this.state.name.value} onChange={this.changeName} onBlur={this.blurName} />
                </NameInputArea>
                <PictureInputArea>
                    <TextInput placeholder="Paste a picture URL" valid={this.state.picture.valid} value={this.state.picture.url} onChange={this.changePicture} onBlur={this.blurPicture} />
                    {/* have the picture src and alt tied to the validity of the picture url, showing a blank 
                    thumbnail when invalid */}
                    <Picture
                        src={this.state.picture.url && this.state.picture.valid ? this.state.picture.url : "/imgs/blank.png"}
                        alt={this.state.picture.url && this.state.picture.valid ? "Image selected" : "No image selected"} />
                </PictureInputArea>
                <RolesInputArea>
                    {/* allow roles to be added, but only from the second onward to be deleted */}
                    <AddIcon small alt="Add Role" onClick={this.addRole} id="roles" style={{ paddingRight: "0.5em", marginBottom: "0.5em", verticalAlign: "middle" }} />
                    Click to add more roles
                    {this.state.roles.value.map((role, index) => (
                        <div key={index}>
                            <TextInput placeholder="Enter a role" valid={this.state.roles.value[index]} value={role} onChange={ev => this.changeRole(index, ev)} onBlur={this.blurRole} width="70%" />
                            {index > 0 && <RemoveIcon alt="Remove Role" onClick={ev => this.removeRole(index, ev)} />}
                        </div>))}
                </RolesInputArea>
                <DetailsInputArea>
                    <TextInput placeholder="Enter an IMDB URL" valid={this.state.details.valid} value={this.state.details.url} onChange={this.changeDetails} onBlur={this.blurDetails} />
                </DetailsInputArea>
                <ButtonsArea>
                    <CancelButton onClick={this.cancel} />
                    <SaveButton onClick={this.save} />
                </ButtonsArea>

                {/* when needed, show the modal confirming successful save */}
                {
                    this.state.confirmSave &&
                    <MessageModal
                        message={`${this.state.name.value} was saved`}
                        onClick={this.props.onSave} />
                }

                {/* when needed, show the modal to confirm data abandonment */}
                {
                    this.state.confirmCancel &&
                    <ConfirmationModal
                        message={`You'll lose the data entered. Are you sure?`}
                        onCancel={this.stay}
                        onConfirm={this.props.onCancel} />
                }
            </Card>
        )
    }
}

export default InsertForm