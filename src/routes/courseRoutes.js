const express = require("express");
const router = express.Router();
const {addCourse,removeCourse, updateCourse,showCourses} = require("../controller/course/coursePost");

const joi = require("joi");
const validator = require("express-joi-validation").createValidator();

const courseSchema = joi.object({
    courseId:joi.number().min(100).max(999).required(),
    courseName:joi.string().min(3).required(),
});

router.get("/showCourses",showCourses);
router.post("/add",validator.body(courseSchema),addCourse);
router.post("/remove",removeCourse);
router.post("/update",updateCourse);

module.exports = router;