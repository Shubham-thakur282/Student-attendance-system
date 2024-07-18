const Parents = require("../../models/parents");

const parentsInfo = async (req, res) => {
    try {

        const { enrollNo } = req.params;
        const parents = await Parents.findOne({ enrollNo: enrollNo });

        if(!parents){
            return res.status(404).send("No parents found");
        }

        res.status(200).send({
            parentsDetails: {
                fatherName: parent.fatherName,
                motherName: parent.motherName,
                enrollNo: enrollNo,
                contactNumber: parent.contactNumber,
            }
        })

    } catch (error) {

        console.log(error.message);
        res.status(500).send("Error Occured. Please try again!");

    }
}


module.exports = { parentsInfo };