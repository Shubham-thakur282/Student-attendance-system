const { query } = require("express");
const Students = require("../../models/student");
const student = require("../../models/student");

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

        res.status(404).send("Students not found!");

    } catch (error) {

        console.log(error.message);
        return res.status(500).send("Error occured. Please try Again");

    }
}


const showStudents = async (req, res) => {
    try {

        const { year, section, enrollNo, rollNo } = req.query;

        const queryObject = {};

        if (year) {
            queryObject.year = year;
        }

        if (section) {
            queryObject.section = section;
        }

        if (enrollNo) {
            queryObject.enrollNo = enrollNo;
        }

        if (rollNo) {
            queryObject.rollNo = rollNo;
        }

        const response = await Students.find(queryObject, "-password");

        if (!response) {
            return res.status(404).send("Students Not Found");
        }

        res.status(200).send({
            studentsDetails: response
        })

    } catch (error) {

        console.log(error.message);
        return res.status(500).send("Error occured. Please try Again");

    }
}

const showStudent = async (req, res) => {
    try {

        const { enrollNo } = req.params;

        const student = await Students.findOne({ enrollNo });

        if (!student) {
            return res.status(404).send("Student Not Found!");
        }

        return res.status(200).send({
            studentDetails: {
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
            }
        });

    } catch (error) {

        console.log(error.message);
        return res.status(500).send("Error occured. Please try Again");

    }
}

const getStudents = async (req, res) => {
    try {

        const { year, section, courseId } = req.params;

        const qurey = {
            year: parseInt(year),
            section,
            courses: { $in: parseInt(courseId) }
        };

        const students = await Students.find({ year: parseInt(year), section, courses: { $in: parseInt(courseId) } }, "-password");

        if (!students || students.length === 0) {
            return res.status(404).send("Students not found!");
        }
        console.log(students.length);
        return res.status(200).json(students);


    } catch (error) {

        console.log(error);
        return res.status(500).send("Error occured. Please try Again");

    }
}

module.exports = { showAll, showStudents, showStudent, getStudents };