const express = require("express");
const deleterouter = express.Router();
const deleteController = require("../Controllers/postReq/prodCat")
const Authentication = require("../middleware/authorization")

deleterouter.put("/single/prod/cat/:id", Authentication, deleteController.ProdCateDelByID)

module.exports = deleterouter