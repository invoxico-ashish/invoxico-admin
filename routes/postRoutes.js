const express = require("express");
const postRouter = express.Router();
const adminController = require("../Controllers/admin");
const prodCateController = require("../Controllers/prodCategory");
const prodTags = require("../Controllers/prodTags")


postRouter.post("/filter/prod/cat/status", prodCateController.filterCategoryByStatus);
postRouter.post("/filter/prod/cat/name", prodCateController.filterCategoryByName);
postRouter.post("/prod/cat", prodCateController.add_Update_Prodcate);
postRouter.post("/filter/tag/status", prodTags.filterTagByStatus)
postRouter.post("/find/tag/name", prodTags.filterTagByName)
postRouter.post("/login/user", adminController.loginAdmin);
postRouter.post("/prod/tag", prodTags.addTag);


module.exports = postRouter;