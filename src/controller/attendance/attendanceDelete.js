const Attendance = require("../../models/attendance");

const deleteRecord = async (req, res) => {
    try {

        const { courseId, date, time, year, section } = req.body;

        const attendaceTaken = await Attendance.exists({ date, time, year, section, courseId });

        if (attendaceTaken) {

            await Attendance.deleteMany({ date, time, year, section, courseId });

            return res.status(200).send("Records Deleted successfully");

        }

        res.status(404).send("Records not found!");

    } catch (error) {

        console.log(error);
        res.status(500).send("Error Occured. Please try again!");

    }
}

const deleteAll = async(req,res)=>{
    try {
        
        await Attendance.deleteMany();

        res.status(200).send("All the attendance have been deleted!");

    } catch (error) {
        
        console.log(error.message);
        res.status(500).send("Error Occured. Please try again!");

    }
}

module.exports = { deleteRecord, deleteAll };