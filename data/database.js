const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

let database;

const initDb = async () => {
  if (database) {
    return database;
  }

  try {
    await client.connect();
    database = client.db("carCollectionDB");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
};

const getDb = () => {
  return database;
};

module.exports = {
  initDb,
  getDb
};