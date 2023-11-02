const express = require("express");
const deleteRouter = express.Router();
const admin = require("../Controllers/admin.controller")
const prodCateController = require("../Controllers/prodCategory.controller");
const prodTags = require("../Controllers/prodTags.controller");
const brand = require("../Controllers//brands.controller");
const products = require("../Controllers/products.controller");



deleteRouter.put("/delete/multiple/prod/cat", prodCateController.deleteProdcate);
deleteRouter.put("/single/prod/cat/:id", prodCateController.deleteProdCateById);
deleteRouter.put("/delete/brand/multiple", brand.delteMultipleBrands);
deleteRouter.put("/delete/tag/multiple", prodTags.deleteMultipleTags)
deleteRouter.put("/single/prod/tag/:id", prodTags.deleteSingleTag)
deleteRouter.put("/delete/product", products.Delete);
deleteRouter.put("/single/brand/:id", brand.deleteBrand);
// deleteRouter.put("/delete/multiple/product", products.deleteMultipleStatus);
deleteRouter.put("/delete/tags/sin/multiple", prodTags.tagDelete);
deleteRouter.put("/product/del/single/multi", products.deleteProduct);
deleteRouter.put("/brand/del/single/multi", brand.deletBrandsing);

module.exports = deleteRouter;