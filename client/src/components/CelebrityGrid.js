import React from "react"
import styled from "styled-components"
import CelebrityCard, { StyledCard } from "./CelebrityCard"
import Mosaic from "./generic/Mosaic"
import Icon from "./generic/Icon"
import { cardModes } from "../constants"

const cellSize = { width: 288, height: 160 }
const gap = 10
const hoverScale = 1.1

const AddIcon = styled(Icon).attrs({
    id: "addIcon",
    src: "add.png",
    alt: "Add",
    size: {
        width: "5em",
        heigth: "5em"
    },
    style: {
        padding: "5em"
    }
})`
`

const CelebrityGrid = ({ celebrityList, add, remove, onCardHover, onCardClick }) => {

    const generateCards = array => array.map(entry => <CelebrityCard
        key={entry._id}
        celebrity={entry}
        callbackForRemove={remove}
        mode={cardModes.small}
        onHover={onCardHover}
        onClick={onCardClick}
        hoverScale={hoverScale}
        cellHeight={cellSize.height}
        rolesInPreview={2} />)

    return (
        <Mosaic id="celebrityGrid" size={cellSize} gap={gap} itemsAmount={celebrityList.length} area={window.innerWidth}>
            <StyledCard onClick={add} hoverScale={hoverScale} cellHeight={cellSize.height}>
                <AddIcon />
                <div>Add a new celebrity</div>
            </StyledCard>
            {generateCards(celebrityList)}
        </Mosaic>
    )
}

export default CelebrityGrid