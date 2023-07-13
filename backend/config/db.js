const mongoose = require("mongoose");
const config = require("config");
const uri = config.get("db.mongoURI");

const connectDB = () => {
  try {
    mongoose.connect(uri);
    console.log("Connected to DB");
  } catch (e) {
    console.error(e)
  }
  return 1;
};

module.exports = connectDB;
