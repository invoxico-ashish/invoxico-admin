const express = require("express");
const router = express.Router()
const adminController = require("../Controllers/postReq/admin")
const prodConroller = require("../Controllers/postReq/prodCat")

router.post("/signup/user", adminController.signUpUser)
router.post("/login/user", adminController.logInUser)
router.post("/prod/cat", prodConroller.Prodcate)


module.exports = router