const Course = require("../../models/course");

const addCourse = async (req, res) => {
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


module.exports = { addCourse };
