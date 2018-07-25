import { serverPath } from "../constants"

const deleteRecord = (details, onSuccess, onFailure) => {
    // DELETE data from the server, with the criteria received
    // executing the success and failure callbacks when appropriate
    fetch(`${serverPath}${details}`, { method: 'DELETE' })
        .then(response => response.ok ? response.json() : onFailure(response))
        .then(response => response && onSuccess(response))
        .catch(error => onFailure(error))
}

export default deleteRecord