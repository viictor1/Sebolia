const express = require('express');
const router = express.Router();

const clientesMock = [
    {
      email: 'tico@utfpr.edu.br'
    },
    {
        titulo: 'bornia',
        autor: 'bornia',
        editora: 'bornia',
        ano: 2005,
        preco: 250
    },
];

router.get('/', (req, res) => {
    res.send(livrosMock);
});

router.post('/', (req, res) => {
    const livro = req.body;
    livrosMock.push(livro);
    res.status(201).json(livro);
});


module.exports = router;