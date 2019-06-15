const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
    MongoClient
        .connect('mongodb+srv://OJIEG65:JVrNAGV32MIC37el@nodejsexpress-yxrr9.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log('connected');
            _db = client.db();
            callback()
        })
        .catch(e => {
            console.log(e);
            throw e;
        });
};

const getDB =()=>{
    if(_db){
        return _db
    }
    throw 'No database found!!!!'
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;