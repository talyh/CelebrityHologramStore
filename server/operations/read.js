const { MongoClient, ObjectId, dbURL, dbName, collectionName } = require("../dbConfig.js")

const read = (id, callback) => {
    // connect to the database
    MongoClient.connect(dbURL, { useNewUrlParser: true }, (err, client) => {
        if (err) { throw err }

        const db = client.db(dbName)

        // search the collection, passing in the id if one was provided
        db.collection(collectionName).find(id && { "_id": ObjectId(id) }).toArray((err, result) => {
            if (err) { throw err }

            // execute the callback with the result of the query
            callback(result)
        })
    })
}

module.exports = read