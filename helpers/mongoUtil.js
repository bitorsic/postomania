const MongoClient = require('mongodb').MongoClient;

let _db;

const connect = async () => {
    let mongoClient;
    try {
        mongoClient = new MongoClient(process.env.DB_URL);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        _db = mongoClient.db('banao');
        console.log('Successfully connected to MongoDB Atlas!');
    } catch (e) {
        console.error('Connection to MongoDB Atlas failed!', e);
        process.exit();
    }
}

const getDb = () => { return _db }

module.exports = { connect, getDb };