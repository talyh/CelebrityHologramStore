import React, { Component } from "react"
import styled from "styled-components"
import Card from "./innerPieces/CelebrityCardContainer"
import TextInput from "./generic/TextInput"
import Picture from "./innerPieces/CelebrityPicture"
import { AddIcon, RemoveIcon } from "./innerPieces/Icons"
import { SaveButton, CancelButton } from "./innerPieces/Buttons"
import { cardModes } from "../constants";

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
        name: "",
        picture: {
            url: "",
            validURL: false
        },
        detailsURL: "",
        roles: [""]
    }

    changeName = ev => this.setState({ name: ev.target.value })
    changePicture = ev => this.setState({ picture: { validURL: this.validatePictureURL(ev.target.value), url: ev.target.value } })
    changeDetails = ev => this.setState({ detailsURL: ev.target.value })
    addRole = () => this.setState(prevState => ({ roles: [...prevState.roles, ""] }))
    changeRole = (index, ev) => this.setState({ roles: [...this.state.roles.slice(0, index), ev.target.value, ...this.state.roles.slice(index + 1)] })
    removeRole = (index, ev) => this.setState({ roles: [...this.state.roles.slice(0, index), ...this.state.roles.slice(index + 1)] })
    validatePictureURL = url => {
        const img = new Image()
        let result = false
        img.onerror = img.onabort = () => result = false
        img.onload = () => result = true
        img.src = url
        return result
    }

    save = () => fetch(`http://localhost:3001/celebrities?name=${this.state.name}&roles=${JSON.stringify(this.state.roles)}&pictureURL=${this.state.picture.url}&detailsURL=${this.state.detailsURL}`, { method: 'POST' })
        .then(response => response.ok ? response.json() : this.handleError(response))
        .then(this.props.onSave)
        .catch(error => this.handleError(error))

    handleError = error => console.log(error)

    render() {
        return (
            <Card mode={cardModes.insertion}>
                <NameInputArea>
                    <TextInput placeholder="Enter a celebrity name" value={this.state.name} onChange={this.changeName} />
                </NameInputArea>
                <PictureInputArea>
                    <TextInput placeholder="Enter a picture URL" value={this.state.picture.url} onChange={this.changePicture} />
                    <Picture
                        src={this.state.picture.url ? this.state.picture.url : "/imgs/blank.png"}
                        alt={this.state.picture.validURL ? "Image selected" : "No image selected"} />
                </PictureInputArea>
                <RolesInputArea>
                    <AddIcon small alt="Add Role" onClick={this.addRole} id="roles" style={{ paddingRight: "0.5em", marginBottom: "0.5em", verticalAlign: "middle" }} />
                    Click to add more roles
                    {this.state.roles.map((role, index) => <div key={index}>
                        <TextInput placeholder="Enter a role" value={role} onChange={ev => this.changeRole(index, ev)} width="70%" />
                        {index > 0 && <RemoveIcon alt="Remove Role" onClick={ev => this.removeRole(index, ev)} />}
                    </div>)}
                </RolesInputArea>
                <DetailsInputArea>
                    <TextInput placeholder="Enter an IMDB URL" value={this.state.detailsURL} onChange={this.changeDetails} />
                </DetailsInputArea>
                <ButtonsArea>
                    <CancelButton onClick={this.props.onCancel} />
                    <SaveButton onClick={this.save} />
                </ButtonsArea>
            </Card>
        )
    }
}

export default InsertForm