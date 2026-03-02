const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function run() {
    try {
        console.log('Connecting to MongoDB...');
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db('food_ordering_db');
        const collection = db.collection('test');

        await collection.insertOne({ test: 1 });
        console.log('Insert successful');

        const doc = await collection.findOne({ test: 1 });
        console.log('Find successful:', doc);

    } catch (err) {
        console.log('Mongo Error:', err.message);
    } finally {
        await client.close();
    }
}

run();
