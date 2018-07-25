import React from "react"
import Mosaic from "./generic/Mosaic"
import AddCelebrityCard from "./innerPieces/AddCelebrityCard"
import CelebrityCard from "./CelebrityCard"
import { AddIcon } from "./innerPieces/Icons"
import { cardModes } from "../constants"

// setup for the grid and
const cellSize = { width: 288, height: 160 }
const gap = 10
const hoverScale = 1.1

// provides a grid of celebrities based on a list, comprised of one Celebrity card for each list entry
const CelebrityGrid = ({ celebrityList, add, close, remove, onCardHover, onCardClick }) => {

    // generate a sorted version of the array and map each entry to a CelebrityCard
    const generateCards = array => {
        const sorted = [...array].sort((entry, next) => entry.name > next.name ? 1 : (next.name > entry.name) ? -1 : 0)
        return sorted.map(entry => <CelebrityCard
            key={entry._id}
            celebrity={entry}
            callbackForClose={close}
            callbackForRemove={remove}
            mode={cardModes.preview}
            onHover={onCardHover}
            onClick={onCardClick}
            hoverScale={hoverScale}
            cellHeight={cellSize.height}
            rolesInPreview={2} />)
    }

    return (
        // render a Mosaic, with one card with Add functionality and the remaining being based off the list received
        <Mosaic id="celebrityGrid" size={cellSize} gap={gap} itemsAmount={celebrityList.length} area={window.innerWidth}>
            <AddCelebrityCard id="addCard" onClick={add} hoverScale={hoverScale}>
                <AddIcon large style={{ alignSelf: "center", margin: "0 auto" }} />
                Add a new celebrity
            </AddCelebrityCard>
            {generateCards(celebrityList)}
        </Mosaic >
    )
}

export default CelebrityGrid