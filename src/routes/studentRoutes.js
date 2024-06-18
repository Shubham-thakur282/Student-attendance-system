const express = require("express");
const router = express.Router();
// const joi = require("joi");
// const validator = require("express-joi-validation").createValidator();

const {addStudent,showAll} = require("../controller/student/studentPost");

router.post("/new-student",addStudent);
router.get("/all",showAll);

module.exports = router;