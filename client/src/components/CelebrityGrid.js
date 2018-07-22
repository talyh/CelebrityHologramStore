import React from "react"
import styled from "styled-components"
import CelebrityCard, { StyledCard } from "./CelebrityCard"
import Grid from "./generic/Grid"
import Icon from "./generic/Icon"
import { cardModes } from "../constants"


const determinColumns = (desiredWidth, area) => area / desiredWidth
const determineGrid = (desiredWidth, list) => {
    const columns = Math.floor(determinColumns(desiredWidth, window.innerWidth))
    return ({ rows: list.length / columns, columns: columns })
}

const StyledCelebrityGrid = styled(Grid).attrs({
    id: "celebrityGrid",
    rows: `${props => props.rows}`,
    columns: `${props => props.columns}`,
    columnGap: "1",
    rowGap: "1"
})`
    height: ${props => props.height}
`
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

    const cellSize = { width: 100, height: 100 }

    const generateCards = array => array.map(entry => <CelebrityCard
        key={entry._id}
        celebrity={entry}
        callbackForRemove={remove}
        mode={cardModes.small}
        onHover={onCardHover}
        onClick={onCardClick} />)

    const gridSize = determineGrid(cellSize.width, celebrityList)

    return (
        <StyledCelebrityGrid rows={gridSize.rows} columns={gridSize.columns} height={cellSize.height}>
            <StyledCard onClick={add}>
                <AddIcon />
                <div>Add a new celebrity</div>
            </StyledCard>
            {generateCards(celebrityList)}
        </StyledCelebrityGrid>
    )
}

export default CelebrityGrid