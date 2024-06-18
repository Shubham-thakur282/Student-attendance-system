const Attendance = require("../../models/attendance");
const Students = require("../../models/student");
const Course = require("../../models/course");

const newAttendace = async (req, res) => {
    try {

        const attendanceRecords = req.body.attendanceRecords;

        if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
            return res.status(400).send("Invalid input, expected an array of attendance record");
        }

        console.log(attendanceRecords);
        const validAttendanceRecords = [];


        for (const record of attendanceRecords) {
            const { enrollNo, courseId, status } = record;

            const studentExist = await Students.find({ enrollNo });
            if (!studentExist) {
                return res.status(404).send(`Student with enrollNo ${enrollNo} not found`);
            }

            const courseExist = await Course.find({ courseId });

            if (!courseExist) {
                return res.status(404).send(`Course with CourseId ${courseId} not found`);
            }

            if (!["A", "P", "L"].includes(status)) {
                return res.status(400).send("Invalid Status");
            }

            validAttendanceRecords.push({ enrollNo, courseId, status });
        }

        const createdRecords = await Attendance.insertMany(validAttendanceRecords);
        res.status(201).json(createdRecords);

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Error Occured. Please try again");
    }
}

module.exports = newAttendace;