const Course = require("../../models/course");

const removeCourse = async (req, res) => {

    try {

        const { courseId } = req.body;
        const res = await Course.deleteOne({ courseId: courseId });

        if (res.deletedCount === 0) {
            return res.status(404).send("Course Not Found");
        }

        return res.status(200).send("Course deleted successfully");

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Error occurred, please try again");

    }
};

module.exports = { removeCourse };