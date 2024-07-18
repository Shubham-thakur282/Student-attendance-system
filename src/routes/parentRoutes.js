const express = require("express");
const router = express.Router();

const { addParent, parentLogin } = require("../controller/parent/parentPost");
const { removeParent } = require("../controller/parent/parentDelete");
const { parentsInfo } = require("../controller/parent/parentGet");

const { auth, roleAuth } = require("../middleware/auth");

//login route
router.post("/parent-login", parentLogin);

//other routes
router.get("/parents-information", auth, roleAuth("Admin"), parentsInfo);

router.post("/add-parent", auth, roleAuth("Admin"), addParent);
router.delete("/remove-parent", auth, roleAuth("Admin"), removeParent);

module.exports = router;