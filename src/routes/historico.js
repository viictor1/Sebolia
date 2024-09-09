const express = require("express");
const router = express.Router();
const { authPage } = require('../security/middlewares');
const historicoService = require("../service/historicoService") ;

router.get('/', authPage(["user", "admin"]), historicoService.getHistorico);


module.exports = router;