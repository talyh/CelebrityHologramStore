import React, { Component } from "react"
import celebrityList from "../dummyData"

class SearchBar extends Component {
    state = {
        filterCriteria: ""
    }

    setFilterCriteria = ev => this.setState({ filterCriteria: ev.target.value })
    search = criteria => {
        const filtered = celebrityList.filter(celebrity => celebrity._id === criteria)
        this.props.onSearch(filtered)
    }

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