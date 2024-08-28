const loginService = require("../service/loginService");
const express = require("express");
const router = express.Router();

router.get('/', loginService.getLogin);
router.post('/', loginService.createLogin);

module.exports = router;