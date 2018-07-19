const { MongoClient, dbURL, dbName, collectionName } = require("../dbConfig.js")

const add = (toAdd, callback) => {
    // connect to the database
    MongoClient.connect(dbURL, { useNewUrlParser: true }, (err, client) => {
        if (err) { throw err }

        const db = client.db(dbName)

        // insert the record into the collection the collection, passing in the id if one was provided
        db.collection(collectionName).insert(toAdd).then(callback)
    })
}

module.exports = add