const Attendance = require("../../models/attendance");
const Students = require("../../models/student");
const Course = require("../../models/course");

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

module.exports = { getAttendanceByStudent, getAttendanceByFaculty };