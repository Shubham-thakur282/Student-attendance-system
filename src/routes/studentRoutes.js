const express = require("express");
const router = express.Router();

const { auth, roleAuth } = require("../middleware/auth");

const { addStudent, studentLogin } = require("../controller/student/studentPost");
const { showAll, showStudents, showStudent, getStudents } = require("../controller/student/studentGet");
const { removeStudent, removeStudents } = require("../controller/student/studentDelete");
const { changePassword } = require("../controller/student/studentPatch");
//students login route
router.post("/student-login", studentLogin);

//routes related to student
//post routes
router.post("/new-student", auth, roleAuth("Admin"), addStudent);


//get routes
router.get("/all-students", auth, showAll);
router.get("/show-students", auth, roleAuth("Faculty"), showStudents);
router.get("/show-student/:enrollNo", auth, roleAuth("Parent"), showStudent);
router.get("/get-students/:year/:section/:courseId", auth, roleAuth("Faculty"), getStudents);

router.delete("/remove-student",auth,roleAuth("Admin"),removeStudent);
router.delete("/remove-students",auth,roleAuth("Admin"),removeStudents);

router.patch("/change-password",auth,roleAuth("Admin"),changePassword);

router.get("/test", (req, res) => {
    res.send("Hello Student");
});


module.exports = router;