const dbConfiguration = {
    MongoClient: require('mongodb').MongoClient,
    ObjectId: require('mongodb').ObjectID,
    dbURL: "mongodb://localhost:27017/CelebrityHologramStore",
    dbName: "CelebrityHologramStore",
    collectionName: "Celebrities"
}

module.exports = dbConfiguration