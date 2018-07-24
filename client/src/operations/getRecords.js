import { serverPath } from "../constants"

const getRecords = (details, onSuccess, onFailure) => {
    // GET data from the server, with the criteria received
    // executing the success and failure callbacks when appropriate
    fetch(`${serverPath}${details}`)
        .then(response => response.ok ? response.json() : onFailure(response))
        .then(response => response && onSuccess(response))
        .catch(error => onFailure(error))
}

export default getRecords