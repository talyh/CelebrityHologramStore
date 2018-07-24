import { serverPath } from "../constants"

const saveRecord = (details, onSuccess, onFailure) => {
    // POST data into the server, with the criteria received
    // executing the success and failure callbacks when appropriate
    fetch(`${serverPath}${details}`, { method: 'POST' })
        .then(response => response.ok ? response.json() : onFailure(response))
        .then(response => response && response.insertedIds && onSuccess())
        .catch(error => onFailure(error))
}

export default saveRecord

