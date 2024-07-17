const express = require("express");
const router = express.Router();
const newAttendance = require("../controller/attendance/attendancePost");
const { getAttendanceByStudent, getAttendanceByFaculty } = require("../controller/attendance/attendanceGet");
const { updateAttendance } = require("../controller/attendance/attendancePatch");
const { deleteRecord } = require("../controller/attendance/attendanceDelete");
const { auth, roleAuth } = require("../middleware/auth");

router.post("/record-new", auth, newAttendance);

router.get("/show-attendance-student/:enrollNo", auth, roleAuth("Student"), getAttendanceByStudent); //this and next function are same just the role is changed in case if parent or student
router.get("/show-attendance-parent/:enrollNo", auth, roleAuth("Parent"), getAttendanceByStudent);
router.get("/show-attendance-faculty/:courseId/:year/:section", auth, roleAuth("Faculty"), getAttendanceByFaculty);

router.patch("/update-attendance", auth, roleAuth("Faculty"), updateAttendance);

router.delete("/remove-record", auth, roleAuth("Faculty"), deleteRecord);

module.exports = router;