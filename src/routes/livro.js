const livroService = require("../service/livroService");
const express = require('express');
const router = express.Router();

router.get('/', livroService.getAllLivros);
router.get('/:id', livroService.getLivroById);
router.post('/', livroService.createLivro);
router.put('/:id', livroService.updateLivro);
router.delete('/:id', livroService.deleteLivro);

module.exports = router;