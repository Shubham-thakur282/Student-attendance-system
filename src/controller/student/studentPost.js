const Students = require("../../models/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const addStudent = async (req, res) => {
    try {
        const { enrollNo, rollNo, fName, lName, year, section, dob, email, courses, fatherName, motherName, parentsContact, password, role } = req.body;

        const studentExist = await Students.exists({ enrollNo: enrollNo });
        if (studentExist) {
            return res.status(409).send("Enrollment Number already exists");
        }

        const newPass = await bcrypt.hash(password, 10);

        const student = await Students.create({
            enrollNo,
            rollNo,
            fName,
            lName,
            year,
            section,
            dob,
            email,
            courses,
            fatherName,
            motherName,
            parentsContact,
            password: newPass,
            role
        })

        res.status(201).json({
            studentDetails: {
                enrollNo: student.enrollNo,
                rollNo: student.rollNo,
                fName: student.fName,
                year: student.year,
                section: student.section,
            }
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Error occured. Please try again");
    }
};


const studentLogin = async (req, res) => {
    try {
        const { enrollNo, password, role } = req.body;
        
        const student = await Students.findOne({ enrollNo: enrollNo });

        if (student && (await bcrypt.compare(password, student.password))) {
            const token = jwt.sign({
                studentId: student._id,
                enrollNo,
                role,
            },
                process.env.TOKEN_KEY, {
                expiresIn: "24h"
            }
            )

            return res.status(201).send({
                studentDetails: {
                    enrollNo: student.enrollNo,
                    token,
                    Name: student.fName,
                    role,
                }
            });
        }

        return res.status(400).send("Invalid Credentials. Please try again");

    } catch (error) {

        return res.status(500).send("Something went wrong. Please try again");
    }
}

module.exports = { addStudent, studentLogin };