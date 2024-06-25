const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    coursesTeaching:[{
        type:Number,
    }],
    classesTeaching:[{
        year:{
            type:Number,
        },
        sections:[{
            type:String,
        }]
    }]
});

module.exports = mongoose.model("faculties",facultySchema);