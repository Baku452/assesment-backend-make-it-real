require("dotenv").config()

const mongoose = require("mongoose")

let connection;

const URI = process.env.NODE_ENV === 'test' ?  process.env.MONGO_URI_TEST : process.env.MONGO_URI

async function connectDB() {
    if (connection) return;
    connection = mongoose.connection;
    await mongoose.connect(URI)
}
async function disconnect() {
  if (!connection) return;
  await mongoose.disconnect();
}

async function cleanup() {
  for (const collection in connection.collections) {
    await connection.collections[collection].deleteMany({});
  }
}

module.exports =  { 
  connectDB,
  disconnect,
  cleanup,
}
