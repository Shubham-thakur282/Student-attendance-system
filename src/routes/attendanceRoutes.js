const express = require("express");
const router = express.Router();
const newAttendance = require("../controller/attendance/attendacePost");
const { auth } = require("../middleware/auth");

router.post("/record-new", auth, newAttendance);

module.exports = router;