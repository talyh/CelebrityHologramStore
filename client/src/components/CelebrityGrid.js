import React from "react"
import styled from "styled-components"
import CelebrityCard from "./CelebrityCard"
import Grid from "./generic/Grid"
import { cardModes } from "../constants"

const determineGrid = list => ({ rows: list.length / 4, columns: 4 })

const StyledCelebrityGrid = styled(Grid).attrs({
    id: "celebrityGrid",
    rows: `${props => props.rows}`,
    columns: `${props => props.columns}`,
    columnGap: "1",
    rowGap: "1"
})`
`

const CelebrityGrid = ({ celebrityList, add, remove, onCardHover, onCardClick }) => {

    const generateCards = array => array.map(entry => <CelebrityCard
        key={entry._id}
        celebrity={entry}
        callbackForRemove={remove}
        mode={cardModes.small}
        onHover={onCardHover}
        onClick={onCardClick} />)

    const gridSize = determineGrid(celebrityList)

    return (
        <StyledCelebrityGrid rows={gridSize.rows} columns={gridSize.columns}>
            <div onClick={add}>Add</div>
            {generateCards(celebrityList)}
        </StyledCelebrityGrid>
    )
}

export default CelebrityGrid