const Parents = require("../../models/parents");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Student = require("../../models/student");

const addParent = async (req, res) => {
    try {
        const { fatherName, motherName, enrollNo, password, contactNumber, role } = req.body;

        const parentExist = await Parents.exists({ enrollNo });
        const studentExist = await Student.exists({ enrollNo });

        if (!studentExist) {
            return res.status(400).json({ message: "Student does not exist." });;
        }

        if (parentExist) {
            return res.status(409).send(`Parents for the student with enroll number ${enrollNo} already exists`);
        }

        const newPass = await bcrypt.hash(password, 10);

        const parent = await Parents.create({
            fatherName,
            motherName,
            enrollNo,
            password: newPass,
            contactNumber,
            role
        })

        res.status(201).json({
            parentsDetails: {
                fatherName: parent.fatherName,
                motherName: parent.motherName,
                role: parent.role,
                enrollNo: parent.enrollNo,
                message: `Parents information added for student with ID ${enrollNo}`
            }
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Error occured. Please try again");
    }
}

const removeParent = async (req, res) => {
    try {
        const { enrollNo, contactNumber } = req.body;
        const parentExist = await Parents.exists({ enrollNo, contactNumber });

        if (parentExist) {
            await Parents.deleteOne({ enrollNo });
            return res.status(200).send(`Parents information deleted for student with Id ${enrollNo}`);
        }

        return res.status(400).send("Parenst information does not exist. Please try again");
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Error occured . Please try again!");
    }
}


const parentLogin = async (req, res) => {
    try {
        const { enrollNo, password, role } = req.body;

        if (role !== "Parent") {
            return res.status(400).send("Invalid role");
        }

        const parent = await Parents.findOne({ enrollNo });

        if (parent && (await bcrypt.compare(password, parent.password))) {
            const token = jwt.sign({
                parentsId: parent._id,
                enrollNo,
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
                    enrollNo: enrollNo,
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

module.exports = { addParent, removeParent, parentLogin };