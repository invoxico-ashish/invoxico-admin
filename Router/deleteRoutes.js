const express = require("express");
const deleterouter = express.Router();
const deleteController = require("../Controllers/prodCat")
const Authentication = require("../middleware/authorization")

deleterouter.put("/single/prod/cat/:id", deleteController.ProdCateDelByID)
deleterouter.put("/multiple/prod/cat",deleteController.delMultipleCateById)

module.exports = deleterouter