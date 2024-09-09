const cadastroService = require("../service/cadastroService");
const express = require('express');
const router = express.Router();

router.get('/', cadastroService.getCadastro);
router.post('/', cadastroService.createCadastro);
router.put('/', cadastroService.updateCadastro);
router.delete('/:id', cadastroService.deleteCadastro);

module.exports = router;