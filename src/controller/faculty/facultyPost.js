const Faculty = require("../../models/faculty");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addFaculty = async (req, res) => {
    try {
        const { name, email, password, role, coursesTeaching, classesTeaching } = req.body;

        const facultyExist = await Faculty.exists({ email });
        if (facultyExist) {
            return res.status(409).send("Faculty already exists");
        }

        const newPass = await bcrypt.hash(password, 10);

        const faculty = await Faculty.create({
            name,
            email,
            password: newPass,
            role,
            coursesTeaching,
            classesTeaching,
        });

        res.status(201).json({
            facultyDetails: {
                name: faculty.name,
                email: faculty.email,
                role: faculty.role,
                message: `${faculty.name} is added`,
            }

        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Error occured. Please try again");
    }
}


const facultyLogin = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // if(role !== "Faculty"){
        //     return res.status(400).send("Invalid role");
        // }

        const faculty = await Faculty.findOne({ email: email, role: role });

        if (faculty && (await bcrypt.compare(password, faculty.password))) {
            const token = jwt.sign({
                facultyId: faculty._id,
                email,
                role,
            },
                process.env.TOKEN_KEY, {
                expiresIn: "24h"
            }
            )

            return res.status(201).send({
                facultyDetails: {
                    Name: faculty.name,
                    token,
                    email: faculty.email,
                    role,
                }
            });
        }

        return res.status(400).send("Invalid Credentials. Please try again");

    } catch (error) {

        return res.status(500).send("Something went wrong. Please try again");
    }

}

module.exports = { addFaculty, facultyLogin };