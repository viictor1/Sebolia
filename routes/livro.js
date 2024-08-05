const express = require('express');
const router = express.Router();

const livrosMock = [
    {
      titulo: 'Dois Irmões',
      autor: 'eu',
      editora: 'o tico',
      ano: 2004,
      preco: 2.50
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

module.exports = router;