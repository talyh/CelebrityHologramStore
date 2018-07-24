import { serverPath } from "../constants"

const saveRecord = (details, onSucces, onFailure) => {
    // POST data into the server, with the criteria received
    // executing the success and failure callbacks when appropriate
    fetch(`${serverPath}${details}`, { method: 'POST' })
        .then(response => response.ok ? response.json() : onFailure)
        .then(response => response.insertedIds ? onSucces() : onFailure)
        .catch(onFailure)
}

export default saveRecord

