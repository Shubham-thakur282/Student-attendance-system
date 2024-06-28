const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    enrollNo: {
        type: Number,
        required: true,
        unique: true,
    },
    rollNo: {
        type: Number,
        required: true,
    },
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
    },
    year: {
        type: Number,
        required: true,
    },
    section: {
        type: String,
        enum: ['A', 'B'],
        required: true,
    },
    dob:{
        type:Date,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    courses: [{
        type:Number
    }],
    fatherName:{
        type:String,
    },
    motherName:{
        type:String,
    },
    parentsContact:{
        type:Number,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"Student",
        required:true,
    }
})

module.exports = mongoose.model("Students",studentSchema);