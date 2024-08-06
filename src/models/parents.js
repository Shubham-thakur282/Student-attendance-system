const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
    fatherName: {
        type: String,
    },
    motherName:{
        type:String,
    },
    enrollNo:{
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
        unique:false,
    },
    role: {
        type: String,
        default:"Parent",
        required: true,
    },
});

module.exports = mongoose.model("Parents", facultySchema);