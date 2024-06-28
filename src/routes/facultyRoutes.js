const express = require("express");
const router = express.Router();

const {auth,roleAuth} = require("../middleware/auth");

const {addFaculty,removeFaculty,facultyLogin} = require("../controller/faculty/facultyPost");

//login route
router.post("/faculty-login",facultyLogin);

//other faculty routes
router.post("/add-faculty",auth,roleAuth("Admin"),addFaculty);
router.post("/remove-faculty",auth,roleAuth("Admin"),removeFaculty);


module.exports = router;