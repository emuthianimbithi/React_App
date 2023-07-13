const express = require("express");
const config = require("config");
require("dotenv").config();

const connectDB = require("./config/db");
const PORT = config.get("server.port");
const userRoutes = require("./Routes/users");

const app = express();

//middleware
app.use(express.json());

if (connectDB()) {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}else{
    console.log('Error opening db');
}

app.use('/user', userRoutes);
