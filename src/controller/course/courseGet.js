const Course = require("../../models/course");

const showCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        if (!courses || courses.length === 0) {
            return res.status(404).send("Courses not found");
        }
        return res.status(200).send(courses);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Error occurred, please try again");
    }
}

module.exports = {showCourses};