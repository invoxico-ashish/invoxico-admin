const express = require("express");
const Updaterouter = express.Router();
const ProdCateContoller = require("./../Controllers/postReq/prodCat")
const Authentication = require("./../middleware/authorization")

Updaterouter.put("/prod/cate/:id", Authentication, ProdCateContoller.UpdateProdCateById)

module.exports = Updaterouter