const Attendance = require("../../models/attendance");
const Students = require("../../models/student");
const Course = require("../../models/course");

const getAttendanceByDate = async (req, res) => {
    try {
        const { courseId, startDate, endDate, section } = req.body;
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        const attendanceRecords = await Attendance.find({ courseId, section , date: { $gte: start, $lte: end } }).sort({ enrollNo: 1, date: 1 });

        if (attendanceRecords.length === 0) {
            return res.status(404).send("Records not found!");
        }

        console.log(`Sending attendance records from ${startDate} to ${endDate}`);
        return res.status(200).send(attendanceRecords);

    } catch (error) {

        console.log(error);
        res.status(500).send("Error Occured. Please try again!");

    }
}

const getAttendanceByStudent = async (req, res) => {
    try {

        const { enrollNo } = req.params;
        const { courseId } = req.query;

        const studentExist = await Students.findOne({ enrollNo });

        if (!studentExist) {
            return res.status(404).send("Student Not Found");
        }

        const query = {};
        query.enrollNo = enrollNo;

        if (courseId) {

            const courseExist = await Course.findOne({ courseId: courseId });

            if (!courseExist) {
                return res.status(404).send("Course Not Found");
            }

            query.courseId = courseId;
        }

        const attendanceRecords = await Attendance.find(query);
        res.status(200).send(attendanceRecords);

    } catch (error) {

        console.log(error);
        res.status(500).send("Error Occured. Please try again!");

    }
}

const getAttendanceByFaculty = async (req, res) => {
    try {

        const { courseId, year, section, } = req.params;
        const { date, time } = req.query;

        const courseExist = await Course.find({ courseId });
        const query = {};


        if (!courseExist) {
            return res.status(404).send("Course Not Found");
        }
        query.courseId = courseId;

        if (year) {
            query.year = year;
        }

        if (section) {
            query.section = section;
        }

        if (date) {
            query.date = date;
        }

        if (time) {
            query.time = time;
        }

        const attendanceRecords = await Attendance.find(query);

        res.status(200).send(attendanceRecords);

    } catch (error) {

        console.log(error);
        res.status(500).send("Error Occured. Please try again!");

    }

}

module.exports = { getAttendanceByStudent, getAttendanceByFaculty, getAttendanceByDate };