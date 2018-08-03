import testData from "../../__tests__/testData"

const getRecords = () => {
    return new Promise((resolve, reject) => {
        resolve(testData)
    })
}

export default getRecords