const { PrismaClient } = require('@prisma/client');

const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    res.send(await prisma.exemplar.findMany());
});

router.get('/unico', async (req, res) => {
    const { livroId, estado } = req.query;

    if(!livroId || !estado){
        res.status(400).json({ message: "Dados Incompletos" });
    }

    try { 
        const exemplar = await prisma.exemplar.findUniqueOrThrow({
            where: {
                livroId_estado: {
                    livroId: Number(livroId),
                    estado: String(estado)
                }
            }
        });
        res.send(exemplar);
    } catch (error) {
        res.status(404).send({ error: 'Exemplar não encontrado' });
    }
});

router.post('/', async (req, res) => {
    const exemplar = req.body;
    
    if(!validarExemplar(res, exemplar)){
        return
    }

    const livro = await prisma.livro.findUnique({ where: { id: exemplar.livroId } });
    if(!livro){
        res.status(404).send({ error: 'Livro não encontrado' });
        return;
    }

    const exemplarSalvo = await prisma.exemplar.create({
        data: {
            estado: exemplar.estado,
            preco: exemplar.preco,
            quantidade: exemplar.quantidade,
            Livro: {
                connect: { id: exemplar.livroId }
            }
        }
    });

    res.status(200).json(exemplarSalvo);
});

router.delete('/', async (req, res) => {
    const { livroId, estado } = req.query;

    if(!livroId || !estado){
        res.status(400).json({ message: "Dados Incompletos" });
    }

    try{
        const exemplar = await prisma.exemplar.delete({
            where: {
                livroId_estado: {
                    livroId: Number(livroId),
                    estado: String(estado)
                }
            }
        });
        res.status(200).json({ message: `Exemplar deletado com sucesso` });
    }
    catch{
        res.status(404).json({ message: "Exemplar não encontrado" })
    }

});

router.put('/', async (req, res) => {
    const { livroId, estado } = req.query;

    if(!livroId || !estado){
        res.status(400).json({ message: "Dados Incompletos" });
    }

    const exemplar = req.body;
    
    if(!validarExemplarEdicao(res, exemplar)){
        return;
    }
    
    try{
        const exemplarAtualizado = await prisma.exemplar.update({
            where: {
                livroId_estado: {
                    livroId: Number(livroId),
                    estado: String(estado)
                }
            },
            data: {
                preco: exemplar.preco,
                quantidade: exemplar.quantidade,
            }
        });
        res.status(200).json(exemplarAtualizado);
    }
    catch
        res.status(404).json({ message: "Exemplar não encontrado" })
    }

});

const validarExemplar = (res, exemplar) =>{
    if(!exemplar){
        res.status(400).json({ message: 'Dados Inválidos' });
        return false;
    }

    if(!exemplar.livroId){
        res.status(400).json({ message: 'Livro Inválido' });
        return false;
    }

    if(!exemplar.estado || !(["Novo", "Semi-Novo", "Usado"].includes(exemplar.estado))){
        res.status(400).json({ message: 'Estado de Conservação Inválido' });
        return false;
    }

    if(!exemplar.preco){
        res.status(400).json({ message: 'Preço Inválido' });
        return false;
    }

    if(!exemplar.quantidade){
        res.status(400).json({ message: 'Quantidade Inválida' });
        return false;
    }

    return true;
}

const validarExemplarEdicao = (res, exemplar) =>{
    if(!exemplar){
        res.status(400).json({ message: 'Dados Inválidos' });
        return false;
    }

    if(!exemplar.preco){
        res.status(400).json({ message: 'Preço Inválido' });
        return false;
    }

    if(!exemplar.quantidade){
        res.status(400).json({ message: 'Quantidade Inválida' });
        return false;
    }

    return true;
}

module.exports = router;