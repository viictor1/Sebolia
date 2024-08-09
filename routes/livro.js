const { PrismaClient } = require('@prisma/client');

const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    res.send(await prisma.livro.findMany());
});

router.post('/', async (req, res) => {
    const livroBody = req.body;
    const livroSalvo = await prisma.livro.create({
        data: {
            titulo: livroBody.titulo,
            autor: livroBody.autor,
            editora: livroBody.editora,
            ano: livroBody.ano,
            preco: livroBody.preco
        }
    });

    res.status(200).json(livroSalvo);
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    const livro = await prisma.livro.delete({
        where: { id }
    });

    res.status(200).json(livro);
});

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const livroBody = req.body;

    const livroAtualizado = await prisma.livro.update({
        where: { id },
        data: {
            titulo: livroBody.titulo,
            autor: livroBody.autor,
            editora: livroBody.editora,
            ano: livroBody.ano,
            preco: livroBody.preco
        }
    });

    res.status(200).json(livroAtualizado);
});


module.exports = router;