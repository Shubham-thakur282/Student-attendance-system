const express = require("express");
const router = express.Router();
const newAttendance = require("../controller/attendance/attendacePost");

router.post("/record-new",newAttendance);

module.exports = router;