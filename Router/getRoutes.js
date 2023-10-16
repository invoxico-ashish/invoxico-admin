const express = require("express");
const GetRouter = express.Router();
const adminRoutes = require("../Controllers/getReq/admin")
const prodCate = require("../Controllers/getReq/prodCat")
const ProdCateContoller = require("./../Controllers/postReq/prodCat")

const Authenticate = require("../middleware/authorization")


GetRouter.get("/admin",adminRoutes.admin)
GetRouter.get("/prod/cat",prodCate.productCategoryAll)
GetRouter.get("/prod/cat/:id",ProdCateContoller.singleProdCateById)

module.exports = GetRouter