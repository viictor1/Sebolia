const compraService = require("../service/compraService");
const express = require("express");
const router = express.Router();
const { authPage } = require('../security/middlewares');

router.post('/', authPage(["user", "admin"]), compraService.compra);


module.exports = router;