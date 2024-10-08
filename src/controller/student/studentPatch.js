const Students = require("../../models/student");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
    try {

        const { enrollNo, newPassword } = req.body;
        const student = await Students.findOne({ enrollNo });

        if (!student) {
            return res.status(404).send("Student Not Found!");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await Students.findOneAndUpdate({ enrollNo }, { password: hashedPassword });

        return res.status(200).send("Password changed successfully!");

    } catch (error) {

        console.log(error.message);
        console.log(error);
        return res.status(500).send("Error occured!");

    }
}

const updateYear = async (req, res) => {
    try {
        await Students.updateMany({ year: 1 }, { year: 2 });

        return res.status(200).send("Year changed!");

    } catch (error) {

        console.log(error.message);
        console.log(error);
        return res.status(500).send("Error Occured!");

    }
}

module.exports = { changePassword, updateYear };