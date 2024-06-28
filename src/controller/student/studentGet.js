const Students = require("../../models/student");

const showAll = async (req, res) => {
    try {
        const students = await Students.find();
        if (students) {
            const filteredStudents = students.map(student => ({
                enrollNo: student.enrollNo,
                rollNo: student.rollNo,
                fName: student.fName,
                lName: student.lName,
                year: student.year,
                section: student.section,
                dob: student.dob,
                email: student.email,
                courses: student.courses,
                fatherName: student.fatherName,
                motherName: student.motherName,
                parentsContact: student.parentsContact
            }));

            return res.status(200).send(filteredStudents);
        }

        res.status(400).send("Students not found!");
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Error occured. Please try Again");
    }
}


const showStudents = (req, res) => {
    try {

    } catch (error) {

    }
}

module.exports = { showAll };