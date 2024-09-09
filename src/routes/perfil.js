const loginService = require('../service/loginService');
const cadastroService = require('../service/cadastroService');
const express = require('express');
const router = express.Router();

router.get('/', loginService.getLogin);
router.put('/', cadastroService.updateCadastro);

module.exports = router;