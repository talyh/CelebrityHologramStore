import React, { Component } from "react"

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

        const imgStyle = { width: "24px", cursor: "pointer" }

        return (
            <div>
                <input type="text" onChange={this.setFilterCriteria} placeholder="Enter an id..." />
                <img src="../imgs/search.png" alt="Search" onClick={() => this.search(this.state.filterCriteria)} style={imgStyle} />
            </div>
        )
    }
}

export default SearchBar