const { PrismaClient } = require('@prisma/client');

const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    res.send(await prisma.livro.findMany());
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).send({ error: 'ID inválido' });
    }

    try {
        const livro = await prisma.livro.findUniqueOrThrow({
            where: { id }
        });
        res.send(livro);
    } catch (error) {
        res.status(404).send({ error: 'Livro não encontrado' });
    }
});

router.post('/', async (req, res) => {
    const livroBody = req.body;
    
    if(!validarLivro(res, livroBody)){
        return
    }
    const livroSalvo = await prisma.livro.create({
        data: {
            titulo: livroBody.titulo,
            autor: livroBody.autor,
            editora: livroBody.editora,
            ano: livroBody.ano
        }
    });

    res.status(200).json(livroSalvo);
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if(isNaN(id)){
        res.status(400).json({ message: 'ID Inválido' });
        return;
    }

    try{
        const livro = await prisma.livro.delete({
            where: { id }
        });
        res.status(200).json({ message: `${livro.titulo} deletado com sucesso` });
    }
    catch{
        res.status(404).json({ message: "Livro não encontrado" })
    }

});

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if(isNaN(id)){
        res.status(400).json({ message: 'ID Inválido' });
        return;
    }

    const livroBody = req.body;
    if(!validarLivro(res, livroBody)){
        return;
    }
    
    try{
        const livroAtualizado = await prisma.livro.update({
            where: { id },
            data: {
                titulo: livroBody.titulo,
                autor: livroBody.autor,
                editora: livroBody.editora,
                ano: livroBody.ano
            }
        });
        res.status(200).json(livroAtualizado);
    }
    catch{
        res.status(404).json({ message: "Livro não encontrado" })
    }

});

const validarLivro = (res, livro) =>{
    if(!livro){
        res.status(400).json({ message: 'Dados Inválidos' });
        return false;
    }

    if(!livro.titulo){
        res.status(400).json({ message: 'Título Inválido' });
        return false;
    }

    if(!livro.autor){
        res.status(400).json({ message: 'Autor Inválido' });
        return false;
    }

    if(!livro.editora){
        res.status(400).json({ message: 'Editora Inválido' });
        return false;
    }

    if(!livro.ano){
        res.status(400).json({ message: 'Ano Inválido' });
        return false;
    }

    return true;
}

module.exports = router;