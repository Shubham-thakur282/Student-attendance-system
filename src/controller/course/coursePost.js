const Course = require("../../models/course");

const addCourse = async (req, res) => {
    //this function is for adding a new course
    try {
        const { courseId, courseName } = req.body;
        const courseExist = await Course.exists({ courseId: courseId });
        if (!courseExist) {
            const course = await Course.create({
                courseId,
                courseName
            });
            return res.status(201).send(course);
        }

        return res.status(409).send("Course already exists");
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Error occurred, please try again");
    }
};

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

const updateCourse = async (req, res) => {
    //update the course name
    try {
        const { courseId, courseName } = req.body;
        const course = await Course.findOne({ courseId: courseId });
        if (!course) {
            return res.status(400).send("Course does not exist. Please try again");
        }
        await Course.findOneAndUpdate({ courseId: courseId }, { courseName: courseName });
        return res.status(200).send("Course name changed successfully");
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Error occurred, please try again");
    }
}

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

module.exports = { addCourse, removeCourse, updateCourse, showCourses };
