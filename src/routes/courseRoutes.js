const express = require("express");
const router = express.Router();
const { addCourse } = require("../controller/course/coursePost");
const { showCourses } = require("../controller/course/courseGet");
const { removeCourse } = require("../controller/course/courseDelete");
const { updateCourse } = require("../controller/course/CoursePatch");
const { auth, roleAuth } = require("../middleware/auth");


const joi = require("joi");
const validator = require("express-joi-validation").createValidator();

const courseSchema = joi.object({
    courseId: joi.number().min(100).max(999).required(),
    courseName: joi.string().min(3).required(),
});

router.get("/show-courses", auth, showCourses);
router.post("/add", validator.body(courseSchema), auth, addCourse);
router.delete("/remove", auth, roleAuth("Admin"), removeCourse);
router.patch("/update", auth, updateCourse);

module.exports = router;