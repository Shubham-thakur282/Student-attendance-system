require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDb = require("./src/database/connect"); //require connectDb function from the src -> database -> connect.js

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json()); // middlewares
app.use(cors());

// register and login routes
app.get("/",(req,res)=>{
    res.send("Welcome to my API");
});

const start = async ()=>{
    try {
        await connectDb(process.env.MONGO_URI_2);
        app.listen(port, (req, res) => {
            console.log(`Server running on port ${port}`);
        }); 
    } catch (error) {
        console.log("Databse Connection failed. Server not started")
        console.log(error);
    }
}

start();    