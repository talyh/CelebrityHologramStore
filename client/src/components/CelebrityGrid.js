import React from "react"
import Mosaic from "./generic/Mosaic"
import AddCelebrityCard from "./innerPieces/AddCelebrityCard"
import CelebrityCard from "./CelebrityCard"
import { AddIcon } from "./innerPieces/Icons"
import { cardModes } from "../constants"

const cellSize = { width: 288, height: 160 }
const gap = 10
const hoverScale = 1.1

const CelebrityGrid = ({ celebrityList, add, close, remove, onCardHover, onCardClick }) => {

    const generateCards = array => {
        const sorted = [...array].sort((entry, next) => entry.name > next.name ? 1 : (next.name > entry.name) ? -1 : 0)
        console.log(sorted)
        return sorted.map(entry => <CelebrityCard
            key={entry._id}
            celebrity={entry}
            callbackForClose={close}
            callbackForRemove={remove}
            mode={cardModes.small}
            onHover={onCardHover}
            onClick={onCardClick}
            hoverScale={hoverScale}
            cellHeight={cellSize.height}
            rolesInPreview={2} />)
    }

    return (
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