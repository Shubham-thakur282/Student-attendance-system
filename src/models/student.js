const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    enrollNo: {
        type: String,
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
        required: true,
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
    dateOfBirth:{
        type:Date,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    courses: [{
        
    }]
})