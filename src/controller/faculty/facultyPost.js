const Faculty = require("../../models/faculty");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addFaculty = async (req, res) => {
    try {
        const { name, email, password, coursesTeaching, classesTeaching } = req.body;

        const facultyExist = await Faculty.exists({ email });
        if (facultyExist) {
            return res.status(409).send("Faculty already exists");
        }

        const newPass = await bcrypt.hash(password, 10);

        const faculty = await Faculty.create({
            name,
            email,
            password: newPass,
            coursesTeaching,
            classesTeaching,
        });

        res.status(201).json({
            facultyDetails: {
                name: faculty.name,
                email: faculty.name,
            }

        })

    } catch (error) {
        return res.status(500).send("Error occured. Please try again");
    }
}

module.exports = {addFaculty};