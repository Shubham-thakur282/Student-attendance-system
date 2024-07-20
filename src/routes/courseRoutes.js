const express = require("express");
const router = express.Router();
const { addCourse } = require("../controller/course/coursePost");
const { showCourses, showCourse } = require("../controller/course/courseGet");
const { removeCourse } = require("../controller/course/courseDelete");
const { updateCourse } = require("../controller/course/CoursePatch");
const { auth, roleAuth } = require("../middleware/auth");


router.get("/show-courses", auth, roleAuth("Admin"), showCourses);
router.get("/show-course", auth, roleAuth("Faculty"), showCourse);
router.post("/add-course", auth, roleAuth("Admin"), addCourse);
router.delete("/remove-course", auth, roleAuth("Admin"), removeCourse);
router.patch("/update-course", auth, roleAuth("Admin"), updateCourse);

module.exports = router;