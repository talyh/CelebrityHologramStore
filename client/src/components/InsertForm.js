import React, { Component } from "react"
import styled from "styled-components"
import Card from "./innerPieces/CelebrityCardContainer"
import TextInput from "./generic/TextInput"
import Picture from "./innerPieces/CelebrityPicture"
import { AddIcon, RemoveIcon } from "./innerPieces/Icons"
import { SaveButton, CancelButton } from "./innerPieces/Buttons"
import MessageModal from "./innerPieces/MessageModal"
import { cardModes } from "../constants"


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
        confirmSave: false
    }

    changeName = ev => this.setState({
        name: {
            ...this.state.name,
            value: ev.target.value
        }
    })
    blurName = ev => this.validateName(ev.target.value)
    changePicture = ev => {
        if (this.state.picture.valid) {
            this.validatePictureURL(this.state.picture.url)
        }

        this.setState({
            picture: {
                ...this.state.picture,
                url: ev.target.value
            }
        })
    }
    blurPicture = ev => this.validatePictureURL(ev.target.value)
    changeDetails = ev => this.setState({
        details: {
            ...this.state.details,
            url: ev.target.value
        }
    })
    blurDetails = ev => this.validateDetailsURL(ev.target.value)
    addRole = () => this.setState({
        roles: {
            ...this.state.roles, value: [...this.state.roles.value, ""]
        }
    })
    changeRole = (index, ev) => this.setState({
        roles: {
            ...this.state.roles,
            value: [...this.state.roles.value.slice(0, index), ev.target.value, ...this.state.roles.value.slice(index + 1)]
        }
    })
    blurRole = ev => this.validateRoles(this.state.roles.value)
    removeRole = (index, ev) => this.setState({
        roles: {
            ...this.state.roles,
            value: [...this.state.roles.value.slice(0, index), ...this.state.roles.value.slice(index + 1)]
        }
    })

    validateName = name => {
        let valid = false
        if (name) {
            valid = true
        }

        this.setState({ name: { ...this.state.name, valid: valid } })
    }
    validatePictureURL = url => {
        const updateState = valid => this.setState({ picture: { ...this.state.picture, valid: valid } })

        const img = new Image()
        img.src = url
        img.onerror = img.onabort = () => { updateState(false) }
        img.onload = () => { updateState(true) }
    }
    validateRoles = roles => {
        let valid = false
        let rolesCopy = [...roles]

        if (rolesCopy.length > 0) {
            rolesCopy = (rolesCopy.filter(role => role))
            if (rolesCopy.length > 0) {
                valid = true
            }
        }

        this.setState({ roles: { ...this.state.roles, valid: valid } })
    }
    validateDetailsURL = url => {
        var domain = '((?:[a-z][a-z\\.\\d\\-]+)\\.(?:[a-z][a-z\\-]+))(?![\\w\\.])'
        var betwenDomainAndPath = '.*?\\/.*?(\\/)(nm)'
        var id = '.*?(\\/)(.)(ref_)(=)'

        const urlFormat = new RegExp(domain + betwenDomainAndPath + id);
        let valid = false
        if (urlFormat.test(url)) {
            valid = true
        }

        this.setState({ details: { ...this.state.details, valid: valid } })
    }
    validateForm = () => {
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

    save = () => {
        if (this.validateForm()) {
            fetch(`http://localhost:3001/celebrities?name=${this.state.name.value}&roles=${JSON.stringify(this.state.roles.value)}&pictureURL=${this.state.picture.url}&detailsURL=${this.state.details.url}`, { method: 'POST' })
                .then(response => response.ok ? response.json() : this.handleError(response))
                .then(this.setState({ confirmSave: true }))
                .catch(error => this.handleError(error))
        }
    }

    handleError = error => console.log(error)

    render() {
        return (
            <Card mode={cardModes.insertion}>
                <NameInputArea>
                    <TextInput placeholder="Enter a celebrity name" valid={this.state.name.valid} value={this.state.name.value} onChange={this.changeName} onBlur={this.blurName} />
                </NameInputArea>
                <PictureInputArea>
                    <TextInput placeholder="Paste a picture URL" valid={this.state.picture.valid} value={this.state.picture.url} onChange={this.changePicture} onBlur={this.blurPicture} />
                    <Picture
                        src={this.state.picture.url && this.state.picture.valid ? this.state.picture.url : "/imgs/blank.png"}
                        alt={this.state.picture.url && this.state.picture.valid ? "Image selected" : "No image selected"} />
                </PictureInputArea>
                <RolesInputArea>
                    <AddIcon small alt="Add Role" onClick={this.addRole} id="roles" style={{ paddingRight: "0.5em", marginBottom: "0.5em", verticalAlign: "middle" }} />
                    Click to add more roles
                    {this.state.roles.value.map((role, index) => <div key={index}>
                        <TextInput placeholder="Enter a role" valid={this.state.roles.value[index]} value={role} onChange={ev => this.changeRole(index, ev)} onBlur={this.blurRole} width="70%" />
                        {index > 0 && <RemoveIcon alt="Remove Role" onClick={ev => this.removeRole(index, ev)} />}
                    </div>)}
                </RolesInputArea>
                <DetailsInputArea>
                    <TextInput placeholder="Enter an IMDB URL" valid={this.state.details.valid} value={this.state.details.url} onChange={this.changeDetails} onBlur={this.blurDetails} />
                </DetailsInputArea>
                <ButtonsArea>
                    <CancelButton onClick={this.props.onCancel} />
                    <SaveButton onClick={this.save} />
                </ButtonsArea>

                {
                    this.state.confirmSave &&
                    <MessageModal
                        message={`${this.state.name.value} was saved`}
                        onClick={this.props.onSave} />
                }
            </Card>
        )
    }
}

export default InsertForm