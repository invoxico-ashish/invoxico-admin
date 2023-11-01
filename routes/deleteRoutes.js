const express = require("express");
const deleteRouter = express.Router();
const admin = require("../Controllers/admin.controller")
const prodCateController = require("../Controllers/prodCategory.controller");
const prodTags = require("../Controllers/prodTags.controller");
const brand = require("../Controllers//brands.controller");
const products = require("../Controllers/products.controller");



deleteRouter.post("/delete/multiple/prod/cat", prodCateController.deleteMultipleCateById);
deleteRouter.put("/single/prod/cat/:id", prodCateController.deleteProdCateById);
deleteRouter.put("/delete/tag/multiple", prodTags.deleteMultipleTags)
deleteRouter.put("/single/prod/tag/:id", prodTags.deleteSingleTag)
deleteRouter.put("/single/brand/:id", brand.deleteBrand)
deleteRouter.put("/delete/brand/multiple", brand.delteMultipleBrands);
deleteRouter.put("/delete/product/:id", products.deleteSingleProduct);
deleteRouter.put("/delete/multiple/product", products.deleteMultipleStatus);

module.exports = deleteRouter;