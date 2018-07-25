import React, { Component } from "react"
import TopBar from "./components/TopBar"
import Content from "./components/Content"
import CelebrityGrid from "./components/CelebrityGrid"
import CelebrityCard from "./components/CelebrityCard"
import InsertForm from "./components/InsertForm"
import { pageModes, cardModes } from "./constants"
import get from "./operations/getRecords"

class App extends Component {
  state = {
    mode: pageModes.list,
    celebrityList: [],
    celebritySelected: ""
  }

  setCelebrityList = newList => this.setState({ celebrityList: newList })

  refreshCelebrityList = () => {
    get("/celebrities",
      result => this.setCelebrityList(result),
      error => console.log("Error: ", error)
    )
  }

  showList = () => { this.setState({ mode: pageModes.list }); this.refreshCelebrityList() }
  showInsertForm = () => this.setState({ mode: pageModes.insertion })
  showDetails = () => this.state.celebritySelected && this.setState({ mode: pageModes.details })
  selectCelebrity = id => this.setState({ celebritySelected: id })

  // when the component first renders, set the view to list and get the records from the server
  componentDidMount() {
    this.refreshCelebrityList()
  }

  render() {
    // create the different components that will be used in each visualization and bind them to each view mode
    const list = <CelebrityGrid
      celebrityList={this.state.celebrityList}
      add={this.showInsertForm}
      close={this.showList}
      remove={this.refreshCelebrityList}
      onCardHover={this.selectCelebrity}
      onCardClick={this.showDetails} />
    const details = <CelebrityCard
      celebrity={this.state.celebrityList.filter(celebrity => celebrity._id === this.state.celebritySelected)[0]}
      callbackForClose={this.showList}
      callbackForRemove={this.showList}
      mode={cardModes.details} />
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
        <TopBar
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
