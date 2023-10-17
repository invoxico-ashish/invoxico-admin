const express = require("express");
const deleterouter = express.Router();
const deleteController = require("../Controllers/prodCat")
const Authentication = require("../middleware/authorization")

deleterouter.put("/single/prod/cat/:id", deleteController.ProdCateDelByID)
deleterouter.post("/multiple/prod/cat",deleteController.deleteMultipleCateById)

module.exports = deleterouter