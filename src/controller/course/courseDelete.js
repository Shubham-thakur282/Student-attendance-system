const Course = require("../../models/course");

const removeCourse = async (req, res) => {
    // remove course from the database
    try {
        const { courseId } = req.body;
        const course = await Course.findOne({ courseId: courseId });
        if (!course) {
            return res.status(400).send("Course does not exist. Please try again");
        }
        await Course.deleteOne({ courseId: courseId });
        return res.status(200).send("Course deleted successfully");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error occurred, please try again");
    }
};

module.exports = {removeCourse};