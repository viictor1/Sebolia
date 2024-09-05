const livroService = require("../service/livroService");
const express = require('express');
const router = express.Router();
const { authPage } = require('../security/middlewares');

router.get('/', authPage(["user", "admin"]), livroService.getAllLivros);
router.get('/:id', authPage(["user", "admin"]),livroService.getLivroById);
router.post('/', authPage(["admin", "admin"]), livroService.createLivro);
router.put('/:id', authPage(["admin"]),livroService.updateLivro);
router.delete('/:id', authPage(["admin"]),livroService.deleteLivro);

module.exports = router;