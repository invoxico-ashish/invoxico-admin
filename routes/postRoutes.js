const express = require("express");
const {upload} = require("../helpers/imgHelper")
const postRouter = express.Router();
const adminController = require("../Controllers/admin");
const prodCateController = require("../Controllers/prodCategory");
const prodTags = require("../Controllers/prodTags")
const brand = require("../Controllers/brands")



postRouter.post("/filter/prod/cat/status", prodCateController.filterCategoryByStatus);
postRouter.post("/filter/prod/cat/name", prodCateController.filterCategoryByName);
postRouter.post("/prod/cat", prodCateController.add_Update_Prodcate);
postRouter.post("/filter/tag/status", prodTags.filterTagByStatus)
postRouter.post("/find/tag/name", prodTags.filterTagByName)
postRouter.post("/login/user", adminController.loginAdmin);
postRouter.post("/prod/tag", prodTags.addTag);
postRouter.post("/brand", upload.single("brand_img"),brand.addBrand)



module.exports = postRouter;