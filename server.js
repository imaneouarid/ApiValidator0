require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express");

const app = express();

app.use(express.json());  




// Connect to the database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Not connected to the database " + err);
  });

// Listen to port
app.listen(process.env.PORT, () => console.log("Server is running on port 4000"));


