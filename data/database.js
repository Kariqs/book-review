const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  database = client.db("bookshare");
}

function getDatabase() {
  if (!database) {
    return;
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDatabase: getDatabase,
};
