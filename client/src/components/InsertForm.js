import React, { Component } from "react"
import Icon from "./Icon"

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
    changePicture = ev => this.setState({ picture: { url: ev.target.value, validURL: this.validatePictureURL(ev.target.value) } })
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
        const dummyStyle = { width: "100px", height: "200px", resize: "none" }

        return (
            <div>
                <input type="text" placeholder="Enter a celebrity name" value={this.state.name} onChange={this.changeName} />
                <input tye="text" placeholder="Enter a picture URL" value={this.state.picture.url} onChange={this.changePicture} />
                <img src={this.state.picture.url} alt={this.state.picture.validURL ? "Image selected" : "No image selected"} style={dummyStyle} />
                <input type="text" placeholder="Enter an IMDB URL" value={this.state.detailsURL} onChange={this.changeDetails} />
                <div>
                    <Icon src="add.png" alt="Add new Role" onClick={this.addRole} />
                    <ul id="roles">
                        {this.state.roles.map((role, index) => <li key={index}>
                            <input type="text" placeholder="Enter a role" value={role} onChange={ev => this.changeRole(index, ev)} />
                            {index > 0 && <Icon src="remove.png" alt="Remove Role" onClick={ev => this.removeRole(index, ev)} />}
                        </li>)}
                    </ul>
                </div>
                <input type="button" value="Cancel" onClick={this.props.onCancel} />
                <input type="button" value="Save" onClick={this.save} />
            </div>
        )
    }
}

export default InsertForm