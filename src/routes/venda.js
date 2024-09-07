const vendaService = require("../service/vendaService");
const express = require("express");
const router = express.Router();
const { authPage } = require('../security/middlewares');

router.post('/', authPage(["user", "admin"]), vendaService.venda);


module.exports = router;