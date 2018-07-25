import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import { shallow } from "enzyme"
import { pageModes } from "../constants"
import CelebrityGrid from '../components/CelebrityGrid'
import testData from "./testData"

describe("Rendering", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it("matches snapshot", () => {
    const rendered = shallow(<App />)

    expect(rendered).toMatchSnapshot()
  })

  it("always has a top bar", () => {
    const rendered = shallow(<App />)

    const topBar = rendered.find("TopBar")

    expect(topBar).toHaveLength(1)
  })

  it("always has a content container", () => {
    const rendered = shallow(<App />)

    const content = rendered.find("#content")

    expect(content).toHaveLength(1)
  })

  it("content has a single child", () => {
    const rendered = shallow(<App />)
    const grid = shallow(<CelebrityGrid celebrityList={testData} />)

    const content = rendered.find("#content")

    expect(content.children).toHaveLength(1)
  })

  it("list mode shows a celebrity grid", () => {
    const rendered = shallow(<App />)
    rendered.setState({
      mode: pageModes.list,
    })

    const celebrityGrid = rendered.find("CelebrityGrid")

    expect(celebrityGrid).toHaveLength(1)
  })

  it("details mode shows a celebrity card", () => {
    const rendered = shallow(<App />)
    rendered.setState({
      mode: pageModes.details,
    })

    const celebrityCard = rendered.find("CelebrityCard")

    expect(celebrityCard).toHaveLength(1)
  })

  it("insertion mode shows an insertion form", () => {
    const rendered = shallow(<App />)
    rendered.setState({
      mode: pageModes.insertion,
    })

    const insertForm = rendered.find("InsertForm")

    expect(insertForm).toHaveLength(1)
  })
})

describe("Props passed down", () => {
  describe("CelebrityGrid", () => {
    it("celebrityList is passed down to the celebrity grid", () => {
      const rendered = shallow(<App />)
      rendered.setState({
        mode: pageModes.list,
        celebrityList: testData
      })

      const celebrityGrid = rendered.find("CelebrityGrid")

      expect(celebrityGrid.prop("celebrityList")).toBe(testData)
    })
  })
})

/*
 * TESTS
 * 
 * Props and Rendering (a few can be covered by snapshot)
 * 
 * 1. DONE - if state.pageModes.list then Content has a CelebrityGrid
 * 
 * 2. DONE - if state.pageModes.details then Content has a CelebrityCard
 * 
 * 3. DONE - if state.pageModes.insertion then Content has an InsertForm
 * 
 * 
 * 4. DONE - CelebrityGrid.celebrityList receives state.celebrityList
 * 
 * 5. CelebrityGrid.add receives showInsertForm
 * 
 * 6. CelebrityGrid.close receives showList
 * 
 * 7. CelebrityGrid.onCardHover receives selectCelebrity
 * 
 * 8. CelebrityGrid.onCardClick receives showDetails
 * 
 * 
 * 9. CelebrityCard.celebrity receives object representing state.celebritySelected
 * 
 * 10. CelebrityCard.callbackForClose receives showList
 * 
 * 11. CelebrityCard.callbackForRemove receives showList
 * 
 * 12. CelebrityCard.mode receives cardModes.details
 * 
 * 
 * 13. InsertForm.onCancel receives showList
 * 
 * 14. InsertForm.onSave receives showList
 * 
 * 
 * 15. SNAPSHOT - TopBar.title receives "Celebrity Hologram Store"
 * 
 * 16. SNAPSHOT - TopBar.subtitle receives "Your favorite celebrities in a single place"
 * 
 * 17. TopBar.onSearch receives setCelebrityList
 * 
 * 18. TopBar.onTitleClick receives showList
 * 
 * 
 * Operations
 * 
 * 19. setCelebrityList updates state.celebrityList with received array
 * 
 * 20. setCelebrityList doesn't update state if argument is not array
 * 
 * 
 * 21. refreshCelebrityList calls get passing "/celebrities", callback for setCelebrityList, 
 * and callback for logging error
 * 
 * 
 * 22. showList changes state.mode to list
 * 
 * 23. showList calls refreshCelebrityList
 * 
 * 
 * 24. showInsertForm changes state.mode to insertion
 * 
 * 
 * 25. showDetails changes state.mode to details if state.celebritySelected
 * 
 * 26. showDetails does nothing if no state.celebritySelected
 * 
 * 
 * 27. select celebrity changes state.celebritySelected to the argument received
 * 
 * 
 * 28. componentDidMount calls refreshCelebrityList
 */