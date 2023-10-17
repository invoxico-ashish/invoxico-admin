const express = require("express");
const router = express.Router()
const adminController = require("../Controllers/admin")
const ProdCateContoller = require("../Controllers/prodCat")

router.post("/signup/user", adminController.signUpUser)
router.post("/login/user", adminController.logInUser)
router.post("/prod/cat", ProdCateContoller.Prodcate)


module.exports = router