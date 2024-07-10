const { required } = require("joi");
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    enrollNo: {
        type: Number,
        required: true,
    },
    courseId: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["A", "P", "L"]
    },
    year: {
        type: Number,
        required: true,
    },
    section: {
        type: String,
        required: true,
        enum: ["A", "B"],
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Attendance", attendanceSchema);