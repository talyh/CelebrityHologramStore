import React, { Component } from "react"
import SearchArea from "./innerPieces/SearchArea"
import SearchBox from "./innerPieces/SearchBox"
import { SearchIcon } from "./innerPieces/Icons"

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
            <SearchArea id="searchArea">
                <SearchBox onChange={this.setFilterCriteria} placeholder="Enter an id..." />
                <SearchIcon onClick={() => this.search(this.state.filterCriteria)} />
            </SearchArea>
        )
    }
}

export default SearchBar