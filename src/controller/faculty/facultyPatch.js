const Faculty = require("../../models/faculty");
const bcrypt = require("bcrypt");


const changePassword = async (req, res) => {
    try {

        const { email, newPassword } = req.body
        const facultyExist = await Faculty.exists({ email });

        if (!facultyExist) {
            return res.status(404).send("Faculty not found!");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await Faculty.findOneAndUpdate({ email }, { password: hashedPassword });
        return res.status(200).send("Password updated successfully");

    } catch (error) {

        console.log(error.message);
        console.log(error);
        return res.status(500).send("Error Occured!");

    }
}

module.exports = { changePassword }