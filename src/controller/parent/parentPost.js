const Parents = require("../../models/parents");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Student = require("../../models/student");

const addParent = async (req, res) => {
    try {
        const { fatherName, motherName, studentId, password, contactNumber, role } = req.body;

        const parentExist = await Parents.exists({ studentId });
        const studentExist = await Student.exists({enrollNo:studentId});

        if(!studentExist){
            return res.status(400).json({message: "Student does not exist."});;
        }

        if (parentExist) {
            return res.status(409).send(`Parents for the student with enroll number ${studentId} already exists`);
        }

        const newPass = await bcrypt.hash(password, 10);

        const parent = await Parents.create({
            fatherName,
            motherName,
            studentId,
            password: newPass,
            contactNumber,
            role
        })

        res.status(201).json({
            parentsDetails: {
                fatherName: parent.fatherName,
                motherName: parent.motherName,
                role: parent.role,
                studentId: parent.studentId,
                message: `Parents information added for student with ID ${studentId}`
            }
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Error occured. Please try again");
    }
}

const removeParent = async (req, res) => {
    try {
        const { studentId, contactNumber } = req.body;
        const parentExist = await Parents.exists({ studentId, contactNumber });

        if (parentExist) {
            await Parents.deleteOne({ studentId });
            return res.status(200).send(`Parents information deleted for student with Id ${studentId}`);
        }

        return res.status(400).send("Parenst information does not exist. Please try again");
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Error occured . Please try again!");
    }
}


const parentLogin = async (req, res) => {
    try {
        const { studentId, password, role } = req.body;

        const parent = await Parents.findOne({ studentId });

        if (parent && (await bcrypt.compare(password, parent.password))) {
            const token = jwt.sign({
                parentsId: parent._id,
                studentId,
                role,
            },
                process.env.TOKEN_KEY, {
                expiresIn: "24h"
            }
            )

            return res.status(201).send({
                parentsDetails: {
                    fatherName: parent.fatherName,
                    motherName: parent.motherName,
                    studentId: studentId,
                    token,
                    contactNumber: parent.contactNumber,
                    role,
                }
            });
        }

        return res.status(400).send("Invalid Credentials. Please try again");

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Something went wrong. Please try again");
    }

}

module.exports = {addParent,removeParent,parentLogin};