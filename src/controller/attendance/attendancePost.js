const Attendance = require("../../models/attendance");
const Students = require("../../models/student");
const Course = require("../../models/course");
// const sendMessage = require("../../utils/sendMessage");

const newAttendace = async (req, res) => {
    try {

        const { attendanceRecords,courseId, date, time, year, section } = req.body;

        if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
            return res.status(400).send("Invalid input, expected an array of attendance record");
        }

        const validAttendanceRecords = [];

        const attendaceTaken = await Attendance.exists({ date, time, year, section, courseId });

        if (!attendaceTaken) {
            for (const record of attendanceRecords) {

                const { enrollNo, status } = record;

                const studentExist = await Students.findOne({ enrollNo });
                
                if (!studentExist) {
                    return res.status(404).send(`Student with enrollNo ${enrollNo} not found`);
                }


                if (studentExist.section !== section || studentExist.year !== year) {
                    return res.status(400).send("Section and year don't match with student's section and year")
                }

                const courseExist = await Course.find({ courseId });

                if (!courseExist) {
                    return res.status(404).send(`Course with CourseId ${courseId} not found`);
                }

                if (!["A", "P", "L"].includes(status)) {
                    return res.status(400).send("Invalid Status");
                }
                
                // if(status === "A"){
                //     const phoneNumber ="91"+ this.toString(studentExist.parentsContact);
                //     sendMessage(phoneNumber,`You ward is Ab`)
                // }

                validAttendanceRecords.push({ enrollNo, courseId, status, date, time, year, section });
            }

            const createdRecords = await Attendance.insertMany(validAttendanceRecords);
            return res.status(201).json(createdRecords);

        }

        res.status(409).send("Record already exist");

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error Occured. Please try again");
    }
}

module.exports = newAttendace;