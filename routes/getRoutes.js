const router = require("express").Router();
const admin = require("../Controllers/admin.controller")
const prodCateController = require("../Controllers/prodCategory.controller");
const prodTags = require("../Controllers/prodTags.controller");
const brand = require("../Controllers/brands.controller");
const products = require("../Controllers/products.controller");


router.get("/prod/cat/:id", prodCateController.getSingleProdCateById);
router.get("/prod/cat", prodCateController.getallProdCate);
router.get("/find/tag/name", prodTags.filterTagByName);
router.get("/prod/tag/:id", prodTags.getSingleTag);
router.get("/prod/tag", prodTags.getAllTags);
router.get("/brand", brand.brands);
router.get("/products", products.allProducts);
router.get("/products/:id", products.singleProduct);


module.exports = router