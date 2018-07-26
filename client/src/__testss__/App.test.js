import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import { shallow } from "enzyme"
import { pageModes, cardModes } from "../constants"
import TopBar from "../components/TopBar"
import Content from "../components/Content"
import CelebrityGrid from "../components/CelebrityGrid"
import CelebrityCard from "../components/CelebrityCard"
import InsertForm from "../components/InsertForm"
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

    const topBar = rendered.find(TopBar)

    expect(topBar).toHaveLength(1)
  })

  it("always has a content container", () => {
    const rendered = shallow(<App />)

    const content = rendered.find(Content)

    expect(content).toHaveLength(1)
  })

  it("content has a single child", () => {
    const rendered = shallow(<App />)

    const content = rendered.find(Content)

    expect(content.children).toHaveLength(1)
  })

  it("list mode shows a celebrity grid", () => {
    const rendered = shallow(<App />)
    rendered.setState({
      mode: pageModes.list,
    })

    const celebrityGrid = rendered.find(CelebrityGrid)

    expect(celebrityGrid).toHaveLength(1)
  })

  it("details mode shows a celebrity card", () => {
    const rendered = shallow(<App />)
    rendered.setState({
      mode: pageModes.details,
    })

    const celebrityCard = rendered.find(CelebrityCard)

    expect(celebrityCard).toHaveLength(1)
  })

  it("insertion mode shows an insertion form", () => {
    const rendered = shallow(<App />)
    rendered.setState({
      mode: pageModes.insertion,
    })

    const insertForm = rendered.find(InsertForm)

    expect(insertForm).toHaveLength(1)
  })
})

describe("Props passed down", () => {
  describe("TopBar", () => {
    it("setCelebrityList is passed down to the TopBar as onSearch", () => {
      const rendered = shallow(<App />)

      const topBar = rendered.find(TopBar)

      expect(topBar.prop("onSearch")).toBe(rendered.instance().setCelebrityList)
    })

    it("showList is passed down to the TopBar as onTitleClick", () => {
      const rendered = shallow(<App />)

      const topBar = rendered.find(TopBar)

      expect(topBar.prop("onTitleClick")).toBe(rendered.instance().showList)
    })
  })

  describe("CelebrityGrid", () => {
    it("celebrityList is passed down to the CelebrityGrid as celebrityList", () => {
      const rendered = shallow(<App />)
      rendered.setState({
        mode: pageModes.list,
        celebrityList: testData
      })

      const celebrityGrid = rendered.find(CelebrityGrid)

      expect(celebrityGrid.prop("celebrityList")).toBe(testData)
    })

    it("showInsertForm is passed down to the CelebrityGrid as add", () => {
      const rendered = shallow(<App />)
      rendered.setState({
        mode: pageModes.list
      })

      const celebrityGrid = rendered.find(CelebrityGrid)

      expect(celebrityGrid.prop("add")).toBe(rendered.instance().showInsertForm)
    })

    it("showList is passed down to the CelebrityGrid as close", () => {
      const rendered = shallow(<App />)
      rendered.setState({
        mode: pageModes.list
      })

      const celebrityGrid = rendered.find(CelebrityGrid)

      expect(celebrityGrid.prop("close")).toBe(rendered.instance().showList)
    })

    it("selectCelebrity is passed down to the CelebrityGrid as onCardHover", () => {
      const rendered = shallow(<App />)
      rendered.setState({
        mode: pageModes.list
      })

      const celebrityGrid = rendered.find(CelebrityGrid)

      expect(celebrityGrid.prop("onCardHover")).toBe(rendered.instance().selectCelebrity)
    })

    it("showDetails is passed down to the CelebrityGrid as onCardClick", () => {
      const rendered = shallow(<App />)
      rendered.setState({
        mode: pageModes.list
      })

      const celebrityGrid = rendered.find(CelebrityGrid)

      expect(celebrityGrid.prop("onCardClick")).toBe(rendered.instance().showDetails)
    })
  })

  describe("CelebrityCard", () => {
    it("celebrity object is passed down to the CelebrityCard as celebrity", () => {
      const rendered = shallow(<App />)
      rendered.setState({
        mode: pageModes.details,
        celebrityList: testData,
        celebritySelected: "5b53fd760f3f76191b4d548b"
      })

      const returned = rendered.instance().getCelebrity(rendered.state().celebritySelected)
      const celebrityCard = rendered.find(CelebrityCard)

      expect(celebrityCard.prop("celebrity")).toBe(returned)
    })

    it("showList is passed down to the CelebrityCard as callbackForClose", () => {
      const rendered = shallow(<App />)
      rendered.setState({
        mode: pageModes.details
      })

      const celebrityCard = rendered.find(CelebrityCard)

      expect(celebrityCard.prop("callbackForClose")).toBe(rendered.instance().showList)
    })

    it("showList is passed down to the CelebrityCard as callbackForRemove", () => {
      const rendered = shallow(<App />)
      rendered.setState({
        mode: pageModes.details
      })

      const celebrityCard = rendered.find(CelebrityCard)

      expect(celebrityCard.prop("callbackForRemove")).toBe(rendered.instance().showList)
    })

    it("cardMode.details is passed down to the CelebrityCard as mode", () => {
      const rendered = shallow(<App />)
      rendered.setState({
        mode: pageModes.details
      })

      const celebrityCard = rendered.find(CelebrityCard)

      expect(celebrityCard.prop("mode")).toBe(cardModes.details)
    })
  })

  describe("InsertForm", () => {
    it("showList is passed down to the InsertForm as onCancel", () => {
      const rendered = shallow(<App />)
      rendered.setState({
        mode: pageModes.insertion
      })

      const insertForm = rendered.find(InsertForm)

      expect(insertForm.prop("onCancel")).toBe(rendered.instance().showList)
    })

    it("showList is passed down to the InsertForm as onSave", () => {
      const rendered = shallow(<App />)
      rendered.setState({
        mode: pageModes.insertion
      })

      const insertForm = rendered.find(InsertForm)

      expect(insertForm.prop("onSave")).toBe(rendered.instance().showList)
    })
  })
})

describe("Operations", () => {
  describe("setCelebrityList", () => {
    it("setCelebrityList updates state.celebrityList with received array", () => {
      const rendered = shallow(<App />)

      expect(rendered.state().celebrityList).toEqual([])

      rendered.instance().setCelebrityList(testData)

      expect(rendered.state().celebrityList).toEqual(testData)
    })

    it("setCelebrityList doesn't update state if argument is not an array", () => {
      const rendered = shallow(<App />)

      expect(rendered.state().celebrityList).toEqual([])

      const argument = "argument"
      rendered.instance().setCelebrityList(argument)

      expect(rendered.state().celebrityList).toEqual([])
    })
  })
})

/*
 * UNIT TESTS
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
 * 5. DONE - CelebrityGrid.add receives showInsertForm
 * 
 * 6. DONE = CelebrityGrid.close receives showList
 * 
 * 7. DONE - CelebrityGrid.onCardHover receives selectCelebrity
 * 
 * 8. DONE - CelebrityGrid.onCardClick receives showDetails
 * 
 * 
 * 9. DONE - CelebrityCard.celebrity receives object representing state.celebritySelected
 * 
 * 10. DONE - CelebrityCard.callbackForClose receives showList
 * 
 * 11. DONE - CelebrityCard.callbackForRemove receives showList
 * 
 * 12. DONE - CelebrityCard.mode receives cardModes.details
 * 
 * 
 * 13. DONE - InsertForm.onCancel receives showList
 * 
 * 14. DONE - InsertForm.onSave receives showList
 * 
 * 
 * 15. SNAPSHOT - TopBar.title receives "Celebrity Hologram Store"
 * 
 * 16. SNAPSHOT - TopBar.subtitle receives "Your favorite celebrities in a single place"
 * 
 * 17. DONE - TopBar.onSearch receives setCelebrityList
 * 
 * 18. DONE - TopBar.onTitleClick receives showList
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
 * 
 * 
 */