const express = require("express")
const app = express()
const port = 3001
const read = require("./operations/read")
const add = require("./operations/add")
const remove = require("./operations/remove")

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
    const callback = result => res.send(result)

    // read data, passing in the id if there's one, and the callback to return results once read
    read(req.query.id, callback)
})

app.post("/celebrities", (req, res) => {
    // create a callback to be executed after data is inserted into the db
    const callback = result => res.send(result)

    // add the data, passing the whole payload and the callback to return results once inserted
    add(req.query, callback)
})

app.delete("/celebrities", (req, res) => {
    // create a callback to be executed after data is deleted from the db
    const callback = result => res.send(result)

    // delete the data, passing the whole payload and the callback to return results once deleted
    remove(req.query.id, callback)
})