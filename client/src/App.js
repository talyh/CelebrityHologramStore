import React, { Component } from "react"
import Header from "./components/Header"
// import CelebrityGrid from "./components/CelebrityGrid"
import celebrityList from "./dummyData"

class App extends Component {
  state = {
    celebrityList: celebrityList
  }

  setCelebrityList = newList => this.setState({ celebrityList: newList })

  render() {
    return (
      <div>
        <Header title="Celebrity Hologram Store" subtitle="Your favorite celebrities in a single place" onSearch={this.setCelebrityList} />
        {/* <CelebrityGrid celebrityList={this.state.celebrityList} /> */}
      </div>
    )
  }
}

export default App
