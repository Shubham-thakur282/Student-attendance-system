const Attendance = require("../../models/attendance");

const deleteRecord = async (req, res) => {
    try {

        const { courseId, date, time, year, section } = req.body;

        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const attendaceTaken = await Attendance.exists({ date: { $gte: startOfDay, $lt: endOfDay }, time, year, section, courseId });

        if (attendaceTaken) {

            await Attendance.deleteMany({ date: { $gte: startOfDay, $lt: endOfDay }, time, year, section, courseId });

            return res.status(200).send("Records Deleted successfully");

        }

        res.status(404).send("Records not found!");

    } catch (error) {

        console.log(error);
        res.status(500).send("Error Occured. Please try again!");

    }
}

const deleteAll = async (req, res) => {
    try {

        const res = await Attendance.deleteMany();

        res.status(204).send("All the attendance have been deleted!");

    } catch (error) {

        console.log(error.message);
        res.status(500).send("Error Occured. Please try again!");

    }
}

module.exports = { deleteRecord, deleteAll };