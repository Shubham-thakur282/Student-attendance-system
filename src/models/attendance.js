const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    enrollNo:{
        type:Number,
        required:true,
    },
    courseId:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:["A","P","L"]
    },
    date:{
        type:Date,
        require:true,
        default:Date.now
    }
});

module.exports = mongoose.model("Attendance",attendanceSchema);