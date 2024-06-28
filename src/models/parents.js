const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
    fatherName: {
        type: String,
    },
    motherName:{
        type:String,
    },
    studentId:{
        type:Number,
        required:true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    contactNumber:{
        type:Number,
        required:true,
    },
    role: {
        type: String,
        default:"Parent",
        required: true,
    },
});

module.exports = mongoose.model("Parents", facultySchema);