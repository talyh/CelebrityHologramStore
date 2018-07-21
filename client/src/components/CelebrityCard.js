import React from "react"
import Icon from "./Icon"

const CelebrityCard = ({ celebrity, callbackForRemove, mode }) => {
    const remove = criteria => fetch(`http://localhost:3001/celebrities?id=${criteria}`, { method: 'DELETE' })
        .then(response => response.ok ? response.json() : handleError(response))
        .then(callbackForRemove)
        .catch(error => handleError(error))

    const handleError = error => console.log(error)

    return <div>
        <h1>{celebrity.name}</h1>
        {celebrity.roles.map(role => <div key={role}>{role}</div>)}
        <img alt={`${celebrity.name}`} src={celebrity.pictureURL} />
        <div>Find out more @ <a href={celebrity.detailsURL}>IMDB</a></div>
        <Icon src="remove.png" alt="Remove" onClick={() => remove(celebrity._id)} />
    </div>
}

export default CelebrityCard