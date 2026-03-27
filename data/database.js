const mongodb = require("mongodb");
require("dotenv").config();

let database;

const initDb = (callback) => {
  if (database) {
    console.log("Database is already initialized");
    return callback(null, database);
  }

  mongodb.MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client.db(process.env.DB_NAME);
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw Error("Database not initialized");
  }
  return database;
};

module.exports = {
  initDb,
  getDb
};