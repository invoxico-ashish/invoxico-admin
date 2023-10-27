const router = require("express").Router();
const admin = require("../Controllers/admin.controller")
const prodCateController = require("../Controllers/prodCategory.controller");
const prodTags = require("../Controllers/prodTags.controller");
const brand = require("../Controllers/brands.controller");


router.get("/prod/cat/:id", prodCateController.getSingleProdCateById);
router.get("/prod/cat", prodCateController.getallProdCate);
router.get("/find/tag/name", prodTags.filterTagByName)
router.get("/prod/tag/:id", prodTags.getSingleTag)
router.get("/prod/tag", prodTags.getAllTags)
router.get("/brand", brand.brands)
router.get("/brand/:id", brand.brandById)

module.exports = router