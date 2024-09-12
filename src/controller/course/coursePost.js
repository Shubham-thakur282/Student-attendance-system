const Course = require("../../models/course");

const addCourse = async (req, res) => {
    try {

        const { courseId, courseName, year } = req.body;
        const courseExist = await Course.exists({ courseId: courseId });

        if (!courseExist) {
            const course = await Course.create({
                courseId,
                courseName,
                year
            });
            return res.status(201).json({
                course,
                message: "Course added successfully",
            });
        }

        return res.status(409).send("Course already exists");

    } catch (error) {

        console.error(error.message);
        return res.status(500).send("Error occurred, please try again");

    }
};


module.exports = { addCourse };
