const express = require("express");
const router = express.Router();

const {auth} = require("../middleware/auth");

const {addFaculty} = require("../controller/faculty/facultyPost");


router.post("/add-faculty",auth,addFaculty);

module.exports = router;