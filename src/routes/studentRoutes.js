const express = require("express");
const router = express.Router();

const {auth, roleAuth} = require("../middleware/auth");

const {addStudent,showAll,studentLogin} = require("../controller/student/studentPost");

//students login route
router.post("/student-login",studentLogin);


//routes related to student
router.post("/new-student",auth,roleAuth("Admin"),addStudent);
router.get("/all",auth,showAll);

router.get("/test",auth,roleAuth("Student"),(req,res)=> {
    res.send("Hello Student");
});



module.exports = router;