const Students = require("../../models/student");

const changePassword = async (req, res) => {
    try {

        const { enrollNo, newPassword } = req.body;
        const student = await Students.findOne({ enrollNo });

        if (!student) {
            return res.status(404).send("Student Not Found!");
        }

        await Students.findOneAndUpdate({ enrollNo }, { password: newPassword });

        return res.status(200).send("Password changed successfully!");

    } catch (error) {

        console.log(error.message);
        console.log(error);
        return res.status(500).send("Error occured!");

    }
}

module.exports = { changePassword };