const express = require("express");
const router = express.Router();

const newAttendance = require("../controller/attendance/attendancePost");
const { getAttendanceByStudent, getAttendanceByFaculty, getAttendanceByDate } = require("../controller/attendance/attendanceGet");
const { updateAttendance } = require("../controller/attendance/attendancePatch");
const { deleteRecord, deleteAll } = require("../controller/attendance/attendanceDelete");

const { auth, roleAuth } = require("../middleware/auth");


router.post("/record-new", auth, roleAuth("Faculty"), newAttendance);

router.get("/show-attendance-student/:enrollNo", auth, roleAuth("Student"), getAttendanceByStudent); //this and next function are same just the role is changed in case if parent or student
router.get("/show-attendance-parent/:enrollNo", auth, roleAuth("Parent"), getAttendanceByStudent);
router.get("/show-attendance-date", auth, getAttendanceByDate);
router.get("/show-attendance-faculty/:courseId/:year/:section", auth, roleAuth("Faculty"), getAttendanceByFaculty);

router.patch("/update-attendance", auth, roleAuth("Faculty"), updateAttendance);

router.delete("/remove-record", auth, roleAuth("Faculty"), deleteRecord);
router.delete("/remove-all-records", auth, roleAuth("Admin"), deleteAll);

module.exports = router;