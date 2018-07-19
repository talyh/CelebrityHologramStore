const express = require("express")
const app = express()
const port = 3001
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID;
const dbURL = "mongodb://localhost:27017/CelebrityHologramStore"
const dbName = "CelebrityHologramStore"
const collectionName = "Celebrities"

// start server
app.listen(port, () => {
    console.log(`app is live at port ${port}`)
});

// allow requests to be made from any domain
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// provide base get route, with no specific behaviour
app.get("/", (req, res) => {
    res.send("choose an operation")
})

// provide a celebrities get route, to read celebrities (both list and entries by id)
app.get("/celebrities", (req, res) => {

    // create a callback to be executed after data is read from the db
    const callback = result => {
        res.send(result)
    }

    // read data, passing in the id if there's one, and the callback to return results once read
    read(req.query.id, callback)
})

app.post("/celebrities", (req, res) => {
    const callback = result => res.send(result)

    add(req.query, callback)
})

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

const add = (toAdd, callback) => {
    // connect to the database
    MongoClient.connect(dbURL, { useNewUrlParser: true }, (err, client) => {
        if (err) { throw err }

        const db = client.db(dbName)

        // insert the record into the collection the collection, passing in the id if one was provided
        db.collection(collectionName).insert(toAdd).then(callback)
    })
}