require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectDb = require("./src/database/connect"); //require connectDb function from the src -> database -> connect.js

const { auth } = require("./src/middleware/auth");

const courseRoutes = require("./src/routes/courseRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const attendanceRoutes = require("./src/routes/attendanceRoutes");
const facultyRoutes = require("./src/routes/facultyRoutes");
const parentRoutes = require("./src/routes/parentRoutes");


const port = process.env.PORT || 5000;
const app = express();


// middlewares
app.use(bodyParser.json());
app.use(express.json()); 
app.use(cors());


app.use("/api/course", courseRoutes); //all the course routes are going to be here
app.use("/api/student", studentRoutes); //all the student routes are going to be here
app.use("/api/attendance", attendanceRoutes); //all the student routes are going to be here
app.use("/api/faculty", facultyRoutes); //all the faculty routes are going to be here
app.use("/api/parents", parentRoutes); //all the parent routes are going to be here


app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

// app.post("/api/sms-delivery-status",(req,res)=>){

// }


const start = async () => {
    try {

        await connectDb(process.env.MONGO_URI);
        app.listen(port, (req, res) => {
            console.log(`Server running on port ${port}`);
        });

    } catch (error) {

        console.log("Databse Connection failed. Server not started")
        console.log(error);

    }
}

start();    