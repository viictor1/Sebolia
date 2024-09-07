const loginService = require("../service/loginService");
const express = require("express");
const router = express.Router();
const { authPage } = require('../security/middlewares');

router.post('/', authPage(["user", "admin"]), loginService.logout);

module.exports = router;