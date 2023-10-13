const express = require("express");
const GetRouter = express.Router();
const getRoutes = require("../Controllers/getReq/admin")


GetRouter.get("/admin", getRoutes.admin)

module.exports = GetRouter