const Course = require("../../models/course");

const updateCourse = async (req, res) => {

    try {

        const { courseId, courseName, year } = req.body;
        const course = await Course.findOne({ courseId: courseId });

        if (!course) {
            return res.status(404).send("Course does not exist. Please try again");
        }

        await Course.findOneAndUpdate({ courseId: courseId }, { courseName: courseName }, { year: year });
        return res.status(200).send("Course name changed successfully");

    } catch (error) {

        console.error(error.message);
        return res.status(500).send("Error occurred, please try again");

    }
}

module.exports = { updateCourse };