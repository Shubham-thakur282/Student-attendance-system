const Course = require("../../models/course");

const showCourses = async (req, res) => {
    try {

        const courses = await Course.find();

        if (!courses) {
            return res.status(404).send("Courses not found");
        }

        return res.status(200).send(courses);

    } catch (error) {

        console.error(error.message);
        return res.status(500).send("Error occurred, please try again!");

    }
}

const showCourse = async (req, res) => {
    try {

        const { courseId } = req.params;
        const course = await Course.findOne({ courseId });

        if (!course) {
            return res.status(404).send("Course not found");
        }

        return res.status(200).send(course);

    } catch (error) {

        console.log(error.message);
        return res.status(500).send("Error occurred. Please try again!");

    }
}

const showCourseToStudents = async (req, res) => {
    try {

        const { courses } = req.body;

        if (!courses || courses.length === 0) {
            return res.status(400).send("No courses provided.");
        }

        const courseDetails = await Course.find({ courseId: { $in: courses } });

        if (courseDetails.length !== courses.length) {
            return res.status(404).send("some courses not found.");
        }

        return res.status(200).json(courseDetails);

    } catch (error) {

        console.log(error.message);
        return res.status(500).send("Error occurred. Please try again!");

    }
}

module.exports = { showCourses, showCourse, showCourseToStudents };