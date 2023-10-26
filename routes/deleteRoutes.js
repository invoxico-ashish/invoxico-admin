const express = require("express");
const deleteRouter = express.Router();
const admin = require("../Controllers/admin")
const prodCateController = require("../Controllers/prodCategory");
const prodTags = require("../Controllers/prodTags");
const brand = require("../Controllers/brands")



deleteRouter.post("/delete/multiple/prod/cat", prodCateController.deleteMultipleCateById);
deleteRouter.put("/single/prod/cat/:id", prodCateController.deleteProdCateById);
deleteRouter.put("/delete/tag/multiple", prodTags.deleteMultipleTags)
deleteRouter.put("/single/prod/tag/:id", prodTags.deleteSingleTag)
deleteRouter.put("/single/brand/:id", brand.deleteBrand)


module.exports = deleteRouter;