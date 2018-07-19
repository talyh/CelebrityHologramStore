const { MongoClient, ObjectId, dbURL, dbName, collectionName } = require("../dbConfig.js")

const remove = (id, callback) => {
    // connect to the database
    MongoClient.connect(dbURL, { useNewUrlParser: true }, (err, client) => {
        if (err) { throw err }

        const db = client.db(dbName)

        // insert the record into the collection the collection, passing in the id if one was provided
        db.collection(collectionName).deleteOne({ "_id": ObjectId(id) }).then(callback)
    })
}

module.exports = remove