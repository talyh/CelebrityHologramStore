import React, { Component } from "react"
import styled from "styled-components"
import Icon from "./generic/Icon"

const SearchArea = styled.div.attrs({
    id: "searchArea"
})`
    grid-area: Search;
    position: relative;
`

const SearchBox = styled.input.attrs({
    id: "searchBox",
    type: "text"
})`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 100%;
    font-size: 1em;
`

const SearchIcon = styled(Icon).attrs({
    id: "searchIcon",
    src: "search.png",
    alt: "Search",
    style: {
        paddingTop: "1.3em",
        paddingBottom: "0.7em",
        marginLeft: "0.5em",
        marginRight: "0.5em"
    }
})`
`

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
            <SearchArea>
                <SearchBox onChange={this.setFilterCriteria} placeholder="Enter an id..." />
                <SearchIcon onClick={() => this.search(this.state.filterCriteria)} />
            </SearchArea>
        )
    }
}

export default SearchBar