require("dotenv").config();
const connectDb = require("./src/database/connect");
const Courses = require("./src/models/course");
const courseData = require("./src/database/courses.json");
// console.log(courseData);

const uri = process.env.MONGO_URI;
const insertData = async()=>{
    try {
        await connectDb(uri);
        await Courses.deleteMany();
        await Courses.insertMany(courseData);   
        console.log("Successfully Inserted the data to the database");
    } catch (error) {
        console.log(error);
    }
}

insertData();