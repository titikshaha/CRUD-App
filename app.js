require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/router");

// Make sure this file exists and properly configures the MongoDB connection
require("./db/conn");

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/" , (req,res) =>{
    res.json("backend start")
})

// Routes
app.use(router);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
