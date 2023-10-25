const router = require("express").Router();
const admin = require("../Controllers/admin")
const prodCateController = require("../Controllers/prodCategory");
const prodTags = require("../Controllers/prodTags")

router.get("/prod/cat", prodCateController.getallProdCate);
router.get("/prod/cat/:id", prodCateController.getSingleProdCateById);
router.get("/prod/tag",prodTags.getAllTags)
router.get("/prod/tag/:id",prodTags.getSingleTag)
router.get("/find/tag/name",prodTags.filterTagByName)

module.exports = router