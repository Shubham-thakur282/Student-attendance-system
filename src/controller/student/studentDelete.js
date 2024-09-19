const Students = require("../../models/student");

const removeStudent = async (req, res) => {
    try {
        const { enrollNo } = req.query;

        if (!enrollNo) {
            return res.status(400).send("Enrollment number is required.");
        }

        const student = await Students.findOne({ enrollNo });

        if (!student) {
            console.log(enrollNo);
            return res.status(404).send("Student not found!");
        }

        await Students.deleteOne({ enrollNo });

        return res.status(200).send(`Student with enrollment number ${enrollNo} is removed!`);

    } catch (error) {

        console.log(error.message);
        console.log(error);
        return res.status(500).send("Error occured!");

    }
}

const removeStudents = async (req, res) => {
    try {
        const { year } = req.query;

        const res = await Students.deleteMany({ year });

        if (res.deletedCount === 0) {
            return res.status(404).send("No students found for the given year!");
        }
        return res.status(200).send(`All students for the year ${year} are removed!`);

    } catch (error) {

        console.log(error.message);
        console.log(error);
        return res.status(500).send("Error occured!");

    }
}

module.exports = { removeStudent, removeStudents };