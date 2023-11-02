const express = require("express");
const { upload } = require("../helpers/imgHelper")
const { Prod_upload } = require("../helpers/imgHelper")
const postRouter = express.Router();
const adminController = require("../Controllers/admin.controller");
const prodCateController = require("../Controllers/prodCategory.controller");
const prodTags = require("../Controllers/prodTags.controller")
const brand = require("../Controllers/brands.controller")
const products = require("../Controllers/products.controller")


postRouter.post("/filter/prod/cat/status", prodCateController.filterCategoryByStatus);
postRouter.post("/product", Prod_upload.array("product_img"), products.addProduct);
postRouter.post("/filter/prod/cat/name", prodCateController.filterCategoryByName);
postRouter.post("/filter/product/status", products.filterProductByStatus);
postRouter.post("/brand", upload.single("brand_img"), brand.addBrand);
postRouter.post("/prod/cat", prodCateController.add_Update_Prodcate);
postRouter.post("/filter/brand/status", brand.filterBrandByStatus);
postRouter.post("/filter/tag/status", prodTags.filterTagByStatus);
postRouter.post("/filter/product/name", products.filterByName);
postRouter.post("/find/tag/name", prodTags.filterTagByName);
postRouter.post("/login/user", adminController.loginAdmin);
postRouter.post("/filter/brand", brand.filterBrandByName);
postRouter.post("/prod/tag", prodTags.addTag);
postRouter.post("/paginate/tag", prodTags.paginateTag)



module.exports = postRouter;