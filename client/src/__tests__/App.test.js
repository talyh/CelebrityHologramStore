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
import get from "../operations/getRecords"

jest.mock("../operations/getRecords")

describe("Unit Tests", () => {
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

    describe("refreshCelebrityList", () => {
      it("refreshCelebrityList calls get with the proper arguments", () => {
        const rendered = shallow(<App />)

        rendered.instance().refreshCelebrityList()

        expect(get.mockImplementation.call.length).toBe(1)
        expect(get.mock.calls[0][0]).toBe("/celebrities")
        expect(get.mock.calls[0][1]).toEqual(expect.any(Function))
        expect(get.mock.calls[0][2]).toEqual(expect.any(Function))
      })
    })

    describe("showList", () => {
      it("showList updates state.mode with list", () => {
        const rendered = shallow(<App />)
        rendered.setState({
          mode: pageModes.details
        })

        rendered.instance().showList()

        expect(rendered.state().mode).toEqual(pageModes.list)
      })

      it("showList calls refreshList", () => {
        const rendered = shallow(<App />)
        const refresh = jest.spyOn(rendered.instance(), "refreshCelebrityList")

        rendered.instance().showList()

        expect(refresh).toBeCalled()
      })
    })

    describe("showInsertForm", () => {
      it("showInsertForm updates state.mode with insertion", () => {
        const rendered = shallow(<App />)

        rendered.instance().showInsertForm()

        expect(rendered.state().mode).toEqual(pageModes.insertion)
      })
    })

    describe("showDetails", () => {
      it("showDetails updates state.mode with details when celebrity is selected", () => {
        const rendered = shallow(<App />)
        rendered.setState({
          celebritySelected: "123"
        })

        rendered.instance().showDetails()

        expect(rendered.state().mode).toEqual(pageModes.details)
      })

      it("showDetails doesn't change state when celebrity is not selected", () => {
        const rendered = shallow(<App />)
        const originalState = rendered.state()

        rendered.instance().showDetails()

        expect(rendered.state()).toEqual(originalState)
      })
    })

    describe("selectCelebrity", () => {
      it("selectCelebrity updates state.celebritySelected with argument", () => {
        const rendered = shallow(<App />)
        const id = "123"

        rendered.instance().selectCelebrity(id)

        expect(rendered.state().celebritySelected).toEqual(id)
      })
    })

    describe("getCelebrity", () => {
      it("getCelebrity filters celebrityList based on argument", () => {
        const rendered = shallow(<App />)
        rendered.setState({
          celebrityList: [{ _id: "123" }, { _id: "456" }]
        })
        const id = "123"

        const returned = rendered.instance().getCelebrity(id)

        expect(returned).toEqual({ _id: "123" })
      })
    })

    describe("componentDidMount", () => {
      it("componentDidMount calls refreshList", () => {
        const rendered = shallow(<App />)
        const refresh = jest.spyOn(rendered.instance(), "refreshCelebrityList")

        rendered.instance().componentDidMount()

        expect(refresh).toBeCalled()
      })
    })
  })
})

describe("Functional Automated Test", () => {
  it("when successful, refreshCelebrityList updates the list with current entries", () => {
    const rendered = shallow(<App />)
    rendered.setState({
      celebrityList: []
    })

    rendered.instance().refreshCelebrityList()

    expect(rendered.state().celebrityList).toBe(testData)
  })
})