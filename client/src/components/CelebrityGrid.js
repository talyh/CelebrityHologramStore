import React from "react"
import styled from "styled-components"
import CelebrityCard from "./CelebrityCard"
import Grid from "./generic/Grid"
import { cardModes } from "../constants"

const StyledCelebrityGrid = styled(Grid).attrs({
    id: "celebrityGrid",
    rows: "2",
    columns: "2",
    columnGap: "1",
    rowGap: "1"
})`
`

const CelebrityGrid = ({ celebrityList, add, remove, onCardClick }) => {

    const generateCards = array => array.map(entry => <CelebrityCard
        key={entry._id}
        celebrity={entry}
        callbackForRemove={remove}
        mode={cardModes.small}
        onClick={ev => onCardClick(ev.target.id)} />)

    return (
        <StyledCelebrityGrid>
            <div onClick={add}>Add</div>
            {generateCards(celebrityList)}
        </StyledCelebrityGrid>
    )
}

export default CelebrityGrid