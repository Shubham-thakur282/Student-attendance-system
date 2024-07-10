const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseId:{
        type:Number,
        required:true,
    },
    year:{
        type:Number,
        required:true,
        enum:[1,2],
    },
    courseName:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("Course",courseSchema);