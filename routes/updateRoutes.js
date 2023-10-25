const express = require("express");
const putRouter = express.Router();
const admin = require("../Controllers/admin")
const prodCateController = require("../Controllers/prodCategory");
const prodTags = require("../Controllers/prodTags");


putRouter.put("/prod/cate/status/:id", prodCateController.updateStatusSingleById);
putRouter.post("/multiple/prod/cate/active", prodCateController.updateMultipleActiveById);
putRouter.put("/prod/tag/single/status/:id", prodTags.changeStatus);
putRouter.post("/multiple/prod/tag/status", prodTags.changeStatusMultiple);

module.exports = putRouter;