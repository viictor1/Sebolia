const express = require('express');
const router = express.Router();

const vendedoresMock = [
    {
      nome: 'wiese',
      cpf: '09812309821',
      quantidadeVendas: 10
    },
    {
      nome: 'vendedor',
      cpf: '12345678910',
      quantidadeVendas: 12
    },
];

router.get('/', (req, res) => {
    res.send(vendedoresMock);
});

module.exports = router;