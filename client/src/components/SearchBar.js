import React, { Component } from "react"
import SearchArea from "./innerPieces/SearchArea"
import TextInput from "./generic/TextInput"
import { SearchIcon } from "./innerPieces/Icons"
import get from "../operations/getRecords"

// provide a search bar comprised of input field and search icon
class SearchBar extends Component {
    state = {
        filterCriteria: ""
    }

    setFilterCriteria = ev => this.setState({ filterCriteria: ev.target.value })

    search = criteria => {
        get(`/celebrities?id=${criteria}`,
            result => this.props.onSearch(result),
            error => console.log("Error: ", error)
        )
    }

    render() {
        return (
            <SearchArea id="searchArea">
                <TextInput valid={true} width="70%" onChange={this.setFilterCriteria} placeholder="Enter an id..."
                    style={{ top: "50%", transform: "translateY(-50%)" }} />
                <SearchIcon onClick={() => this.search(this.state.filterCriteria)} />
            </SearchArea>
        )
    }
}

export default SearchBar