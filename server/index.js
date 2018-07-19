const express = require("express")
const app = express()
const port = 3001

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

    const dummyData = [
        {
            "_id": "1",
            "name": "Woody Allen",
            "roles": ["Writer", "Director", "Actor"],
            "pictureURL": "https://m.media-amazon.com/images/M/MV5BMTI1MjU3MTI2MF5BMl5BanBnXkFtZTcwMDgxNTE4MQ@@._V1_UY317_CR1,0,214,317_AL_.jpg",
            "detailsURL": "https://www.imdb.com/name/nm0000095/?ref_=fn_al_nm_1"
        },
        {
            "_id": "2",
            "name": "Christopher Nolan",
            "roles": ["Writer", "Director"],
            "pictureURL": "https://m.media-amazon.com/images/M/MV5BNjE3NDQyOTYyMV5BMl5BanBnXkFtZTcwODcyODU2Mw@@._V1_UY317_CR7,0,214,317_AL_.jpg",
            "detailsURL": "https://www.imdb.com/name/nm0634240/?ref_=fn_al_nm_1"
        }
    ]

    if (req.query.id) {
        res.send(dummyData.filter(celebrity => celebrity._id === req.query.id))
    }
    else {
        res.send(dummyData)
    }
})