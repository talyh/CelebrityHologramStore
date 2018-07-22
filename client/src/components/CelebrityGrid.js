import React from "react"
import styled from "styled-components"
import CelebrityCard from "./CelebrityCard"
import Grid from "./generic/Grid"
import { cardModes } from "../constants"

const StyledCelebrityGrid = styled(Grid).attrs({
    id: "celebrityGrid"
})`
    cursor: "pointer";
`

const CelebrityGrid = ({ celebrityList, add, remove }) => {

    const generateCards = array => array.map(entry => <CelebrityCard celebrity={entry} callbackForRemove={remove} key={entry._id} mode={cardModes.small} />)

    return (
        <StyledCelebrityGrid rows="2" columns="2">
            <div onClick={add}>Add</div>
            {generateCards(celebrityList)}
        </StyledCelebrityGrid>
    )
}

export default CelebrityGrid