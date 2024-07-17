const Attendance = require("../../models/attendance");
const Students = require("../../models/student");
const Course = require("../../models/course");

const updateAttendance = async (req, res) => {
    try {

        const { attendanceRecords, courseId, date, time, year, section } = req.body;

        if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
            return res.status(400).send("Invalid input, expected an array of attendance record");
        }

        const attendaceTaken = await Attendance.exists({ date, time, year, section, courseId });
        const filter = {
            date,
            time,
            year,
            section,
            courseId,
        }
        if (attendaceTaken) {
            for (const record of attendanceRecords) {
                const {enrollNo, status} = record;
                filter.enrollNo = enrollNo;
                const update = {
                    $set: { status }
                }

                await Attendance.findOneAndUpdate(filter,update);

            }
            return res.status(200).send("Records updated Successfully");
        }

        res.status(404).send("Records not found!");

    } catch (error) {

        console.log(error);
        res.status(500).send("Error Occured. Please try again!");

    }
}

module.exports = {updateAttendance};

