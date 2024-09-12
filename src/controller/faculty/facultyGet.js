const Faculty = require("../../models/faculty");

const showFaculties = async (req, res) => {
    try {

        const { role } = req.query;

        const query = {};

        if (role) {
            query.role = role;
        }

        const faculties = await Faculty.find(query, "-password");

        if (!faculties || faculties.length === 0) {
            return res.status(404).send("Faculties not found!");
        }
        return res.status(200).send(faculties);

    } catch (error) {

        console.log(error.message);
        return res.status(500).send("Error occured. Please try Again");

    }
}

module.exports = { showFaculties };