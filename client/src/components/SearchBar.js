import React, { Component } from "react"
import Icon from "./Icon"

class SearchBar extends Component {
    state = {
        filterCriteria: ""
    }

    setFilterCriteria = ev => this.setState({ filterCriteria: ev.target.value })

    search = criteria => {
        fetch(`http://localhost:3001/celebrities?id=${criteria}`)
            .then(response => response.ok ? response.json() : this.handleError(response))
            .then(result => this.props.onSearch(result))
            .catch(error => this.handleError(error))
    }

    handleError = error => console.log(error)

    render() {
        return (
            <div>
                <input type="text" onChange={this.setFilterCriteria} placeholder="Enter an id..." />
                <Icon src="search.png" alt="Search" onClick={() => this.search(this.state.filterCriteria)} />
            </div>
        )
    }
}

export default SearchBar