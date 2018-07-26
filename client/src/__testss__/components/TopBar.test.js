import React from "react"
import { shallow } from "enzyme"
import App from "../../App"
import TopBar from "../../components/TopBar"
import Title from "../../components/innerPieces/AppTitle"
import SearchBar from "../../components/SearchBar"
import { pageModes } from "../../constants"


describe("Unit Tests", () => {
    describe("Rendering", () => {
        it("matches snapshot", () => {
            const rendered = shallow(<TopBar />)

            expect(rendered).toMatchSnapshot()
        })
    })

    describe("Props passed down", () => {
        it("onSearch is passed down to the SearchBar as onSearch", () => {
            const onSearch = () => { }
            const rendered = shallow(<TopBar onSearch={onSearch} />)

            const searchBar = rendered.find(SearchBar)

            expect(searchBar.prop("onSearch")).toBe(onSearch)
        })
    })
})

describe("Functional Automated Test", () => {
    it("on title click app shows list", () => {
        const app = shallow(<App />)
        app.setState({
            mode: pageModes.details
        })

        const topBar = shallow(<TopBar onTitleClick={app.instance().showList()} />)
        const title = topBar.find(Title)

        title.simulate("click")

        expect(app.state().mode).toBe(pageModes.list)
    })
})