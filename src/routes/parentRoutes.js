const express = require("express");
const router = express.Router();

const {addParent, removeParent,parentLogin} = require("../controller/parent/parentPost");

const {auth,roleAuth} = require("../middleware/auth");

//login route
router.post("/parent-login",parentLogin);

//other routes
router.post("/add-parent",auth,roleAuth("Admin"),addParent);
router.post("/remove-parent",auth,roleAuth("Admin"),removeParent);

module.exports = router;