const { MongoClient } = require("mongodb");

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

async function db() {
    let conn;
    try {
        conn = await client.connect();
    } catch (e) {
        console.error(e);
    }

    let database = conn.db("WebProject");

    return database;
}

module.exports = {
    db
};