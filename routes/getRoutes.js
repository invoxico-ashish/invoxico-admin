const router = require("express").Router();
const admin = require("../Controllers/admin")
const prodCateController = require("../Controllers/prodCategory");
const prodTags = require("../Controllers/prodTags")

router.get("/prod/cat/:id", prodCateController.getSingleProdCateById);
router.get("/prod/cat", prodCateController.getallProdCate);
router.get("/find/tag/name",prodTags.filterTagByName)
router.get("/prod/tag/:id",prodTags.getSingleTag)
router.get("/prod/tag",prodTags.getAllTags)

module.exports = router