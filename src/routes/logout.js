const loginService = require("../service/loginService");
const express = require("express");
const router = express.Router();

router.post('/', loginService.logout);

module.exports = router;