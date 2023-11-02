const express = require("express");
const putRouter = express.Router();
const admin = require("../Controllers/admin.controller")
const prodCate = require("../Controllers/prodCategory.controller");
const prodTags = require("../Controllers/prodTags.controller");
const brand = require("../Controllers/brands.controller");
const products = require("../Controllers/products.controller");


putRouter.post("/multiple/prod/cate/active", prodCate.updateMultipleActiveById);
putRouter.put("/prod/cate/status/:id", prodCate.updateStatusSingleById);
putRouter.post("/multiple/prod/tag/status", prodTags.changeStatusMultiple);
putRouter.put("/brand/multiple/status", brand.changeBrandStatusMultiple);
putRouter.put("/prod/tag/single/status/:id", prodTags.changeStatus);
putRouter.put("/brand/single/status/:id", brand.changeBrandStatus);
putRouter.put("/product/status", products.Status);
putRouter.put("/tag/status/sin/multi", prodTags.tagStatus);
putRouter.put("/prodcate/status/multi/single",prodCate.prodCateStatus );
putRouter.put("/product/status/multi/single",products.changeStatus );
putRouter.put("/brand/status/multi/single",brand.changeStatus );
// putRouter.put("/product/status/multiple/status", products.changeProductsStatusMultiple);



module.exports = putRouter;