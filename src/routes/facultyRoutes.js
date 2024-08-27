const express = require("express");
const router = express.Router();

const { auth, roleAuth } = require("../middleware/auth");

const { addFaculty, facultyLogin } = require("../controller/faculty/facultyPost");
const { removeFaculty } = require("../controller/faculty/facultyDelete");
const {showFaculties} = require("../controller/faculty/facultyGet");

//login route
router.post("/faculty-login", facultyLogin);

//other faculty routes
router.get("/show-faculty", auth, showFaculties);
router.post("/add-faculty", auth, roleAuth("Admin"), addFaculty);
router.delete("/remove-faculty", auth, roleAuth("Admin"), removeFaculty);


module.exports = router;