const express = require("express");
const router = express.Router()
const adminController = require("../Controllers/postReq/admin")
const authenticateToken = require("../middleware/authorization");

router.post("/signup/user", adminController.signUpUser)
router.post("/login/user", adminController.logInUser)

module.exports = router