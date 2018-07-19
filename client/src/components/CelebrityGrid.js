import React from "react"
import CelebrityCard from "./CelebrityCard"

const CelebrityGrid = ({ celebrityList }) => {

    const generateCards = array => array.map(entry => <CelebrityCard celebrity={entry} key={entry._id} />)

    return <div>
        {generateCards(celebrityList)}
    </div>
}

export default CelebrityGrid