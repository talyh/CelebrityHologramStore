import React from "react"
import CelebrityCard from "./CelebrityCard"

const CelebrityGrid = ({ celebrityList, add }) => {

    const dummyStyle = { cursor: "pointer" }

    const generateCards = array => array.map(entry => <CelebrityCard celebrity={entry} key={entry._id} />)

    return <div>
        <div style={dummyStyle} onClick={add}>Add</div>
        {generateCards(celebrityList)}
    </div>
}

export default CelebrityGrid