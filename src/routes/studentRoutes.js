const express = require("express");
const router = express.Router();

const { auth, roleAuth } = require("../middleware/auth");

const { addStudent, studentLogin } = require("../controller/student/studentPost");
const { showAll, showStudents } = require("../controller/student/studentGet");

//students login route
router.post("/student-login", studentLogin);

//routes related to student
//post routes
router.post("/new-student", auth, roleAuth("Admin"), addStudent);


//get routes
router.get("/all-students", auth, showAll);
router.get("/show-students", auth, showStudents);

router.get("/test", (req, res) => {
    res.send("Hello Student");
});


module.exports = router;