import React, { Component } from "react"
import styled from "styled-components"
import Header from "./components/Header"
import CelebrityGrid from "./components/CelebrityGrid"
import CelebrityCard from "./components/CelebrityCard"
import InsertForm from "./components/InsertForm"
import { pageModes, cardModes } from "./constants"

const Content = styled.div`
  position: relative;
  top: 12em;
  padding: 2em;
`

class App extends Component {
  state = {
    mode: "",
    celebrityList: [],
    celebrityShown: ""
  }

  setCelebrityList = newList => this.setState({ celebrityList: newList })

  refreshCelebrityList = () => {
    fetch("http://localhost:3001/celebrities")
      .then(response => response.ok ? response.json() : this.handleError(response))
      .then(result => this.setCelebrityList(result))
      .catch(error => this.handleError(error))
  }

  showList = () => { this.setState({ mode: pageModes.list }); this.refreshCelebrityList() }
  showInsertForm = () => this.setState({ mode: pageModes.insertion })
  showDetails = () => this.setState({ mode: pageModes.details })
  selectCelebrity = id => this.setState({ celebrityShown: this.state.celebrityList.filter(celebrity => celebrity._id === id)[0] })

  componentDidMount() {
    this.showList()
  }

  handleError = error => console.log(error)

  render() {
    const list = <CelebrityGrid
      celebrityList={this.state.celebrityList}
      add={this.showInsertForm}
      remove={this.refreshCelebrityList}
      onCardHover={this.selectCelebrity}
      onCardClick={this.showDetails} />
    const details = <CelebrityCard
      celebrity={this.state.celebrityShown}
      callbackForRemove={this.showList}
      mode={cardModes.big} />
    const insertForm = <InsertForm
      onCancel={this.showList}
      onSave={this.showList} />

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
        <Header
          title="Celebrity Hologram Store"
          subtitle="Your favorite celebrities in a single place"
          onSearch={this.setCelebrityList}
          onTitleClick={this.showList} />
        <Content id="content">
          {determineContents()}
        </Content>
      </div>
    )
  }
}

export default App
