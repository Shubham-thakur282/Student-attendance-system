const express = require("express");
const router = express.Router();
const { addCourse } = require("../controller/course/coursePost");
const { showCourses } = require("../controller/course/courseGet");
const { removeCourse } = require("../controller/course/courseDelete");
const { updateCourse } = require("../controller/course/CoursePatch");
const { auth, roleAuth } = require("../middleware/auth");


router.get("/show-courses", auth, showCourses);
router.post("/add", auth, addCourse);
router.delete("/remove", auth, roleAuth("Admin"), removeCourse);
router.patch("/update", auth, updateCourse);

module.exports = router;