const Parents = require("../../models/parents");

const removeParent = async (req, res) => {
    try {

        const { enrollNo, contactNumber } = req.body;
        const parentExist = await Parents.exists({ enrollNo, contactNumber });

        if (parentExist) {

            await Parents.deleteOne({ enrollNo });
            return res.status(200).send(`Parents information deleted for student with Id ${enrollNo}`);

        }

        return res.status(404).send("Parenst information does not exist. Please try again");

    } catch (error) {

        console.log(error.message);
        return res.status(500).send("Error occured . Please try again!");

    }
}

module.exports = { removeParent };