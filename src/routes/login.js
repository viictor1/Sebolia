const loginService = require("../service/loginService");
const express = require("express");
const session = require("../security/session");
const router = express.Router();

router.get('/', loginService.getLogin);
router.post('/', loginService.createLogin);
router.get('/session', session.getSession);

module.exports = router;