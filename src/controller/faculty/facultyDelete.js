const Faculty = require("../../models/faculty");

const removeFaculty = async (req, res) => {
    try {

        const { name, email } = req.body;
        const facultyExist = await Faculty.exists({ email, name });

        if (facultyExist) {

            await Faculty.deleteOne({ email });
            return res.status(200).send(`${name} removed successfully`);

        }

        return res.status(404).send("Faculty not found . Please try again");

    } catch (error) {

        console.log(error.message);
        return res.status(500).send("Error occured . Please try again!");

    }
}

module.exports = { removeFaculty };