const express = require("express");
const GetRouter = express.Router();
const adminController = require("../Controllers/admin")
const ProdCateContoller = require("./../Controllers/prodCat")

const Authenticate = require("../middleware/authorization")


GetRouter.get("/admin",adminController.admin)
GetRouter.get("/prod/cat",ProdCateContoller.productCategoryAll)
GetRouter.get("/prod/cat/:id",ProdCateContoller.singleProdCateById)

module.exports = GetRouter
