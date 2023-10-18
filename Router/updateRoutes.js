const express = require("express");
const Updaterouter = express.Router();
const ProdCateContoller = require("./../Controllers/prodCat")
const Authentication = require("./../middleware/authorization")

Updaterouter.put("/prod/cate/:id", ProdCateContoller.UpdateProdCateById)
Updaterouter.put("/prod/cate/status/:id", ProdCateContoller.UpdateProdCateStatus)

module.exports = Updaterouter