const express = require("express");
const router = express.Router();

const { auth, roleAuth } = require("../middleware/auth");

const { addFaculty, facultyLogin } = require("../controller/faculty/facultyPost");
const { removeFaculty } = require("../controller/faculty/facultyDelete");

//login route
router.post("/faculty-login", facultyLogin);

//other faculty routes
router.post("/add-faculty", auth, roleAuth("Admin"), addFaculty);
router.delete("/remove-faculty", auth, roleAuth("Admin"), removeFaculty);


module.exports = router;