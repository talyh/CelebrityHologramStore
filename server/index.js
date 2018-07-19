const express = require("express")
const app = express()
const port = 3001
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID;
const dbURL = "mongodb://localhost:27017/CelebrityHologramStore"

app.listen(port, () => {
    console.log(`app is live at port ${port}`)
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get("/", (req, res) => {
    res.send("choose an operation")
})

app.get("/celebrities", (req, res) => {

    const callback = result => {
        res.send(result)
    }
    read(req.query.id, callback)
})

const read = (id, callback) => {
    MongoClient.connect(dbURL, { useNewUrlParser: true }, (err, client) => {
        if (err) { throw err }

        const db = client.db("CelebrityHologramStore")

        db.collection("Celebrities").find(id && { "_id": ObjectId(id) }).toArray((err, result) => {
            if (err) { throw err }

            callback(result)
        })
    })
}