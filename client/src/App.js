import React, { Component } from "react"
import Header from "./components/Header"
import CelebrityGrid from "./components/CelebrityGrid"
import CelebrityCard from "./components/CelebrityCard"
import InsertForm from "./components/InsertForm"
import pageModes from "./constants"


class App extends Component {
  state = {
    mode: pageModes.list,
    celebrityList: []
  }

  setCelebrityList = newList => this.setState({ celebrityList: newList })

  refreshCelebrityList = () => {
    fetch("http://localhost:3001/celebrities")
      .then(response => response.ok ? response.json() : this.handleError(response))
      .then(result => this.setCelebrityList(result))
      .catch(error => this.handleError(error))
  }

  showInsertForm = () => this.setState({ mode: pageModes.insertion })

  showDetails = () => this.setState({ mode: pageModes.details })

  componentDidMount() {
    this.refreshCelebrityList()
  }

  handleError = error => console.log(error)

  render() {
    const list = <CelebrityGrid celebrityList={this.state.celebrityList} add={this.showInsertForm} remove={this.refreshCelebrityList} />
    const details = <CelebrityCard />
    const insertForm = <InsertForm />

    const determineContents = () => {
      switch (this.state.mode) {
        case pageModes.list:
        default:
          return list
        case pageModes.details:
          return details
        case pageModes.insertion:
          return insertForm
      }
    }

    return (
      <div>
        <Header title="Celebrity Hologram Store" subtitle="Your favorite celebrities in a single place" onSearch={this.setCelebrityList} />
        {determineContents()}
      </div>
    )
  }
}

export default App
