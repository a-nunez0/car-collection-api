const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

let database;

const initDb = async () => {
  if (database) {
    return database;
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();

  database = client.db("carCollectionDB");
  console.log("Connected to MongoDB");

  return database;
};

const getDb = () => {
  if (!database) {
    throw new Error("Database has not been initialized");
  }

  return database;
};

module.exports = {
  initDb,
  getDb
};