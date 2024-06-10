require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

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
        app.listen(port, (req, res) => {
            console.log(`Server running on port ${port}`);
        }); 
    } catch (error) {
        console.log(error);
    }
}

start();    