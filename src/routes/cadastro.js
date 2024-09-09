const { authPage } = require("../security/middlewares");
const cadastroService = require("../service/cadastroService");
const express = require('express');
const router = express.Router();

router.get('/', cadastroService.getCadastro);
router.post('/', cadastroService.createCadastro);
router.put('/', cadastroService.updateCadastro);
router.delete('/', cadastroService.deleteCadastro);
router.put('/alterarSenha', authPage(["user", "admin"]), cadastroService.alterarSenha);
router.put('/adicionarSaldo', authPage(["user", "admin"]), cadastroService.adicionarSaldo);
module.exports = router;