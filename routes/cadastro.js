const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

// Rota para exibir o formulário de cadastro
router.get('/', (req, res) => {
    res.render('cadastro');
});

// Rota para processar o formulário de cadastro
router.post('/', async (req, res) => {
    const { username, password, cellphone } = req.body;

    try {
        // Verificar se o nome de usuário já existe
        const existingUser = await prisma.cliente.findFirst({
            where: {
                OR:[
                    {usuario: username},
                    {celular: cellphone}
                ]
            }
        });

        console.log("Existing User:", existingUser); // Verifique o valor retornado

        if (existingUser) {
            // Se o usuário já existe, renderizar o formulário novamente com uma mensagem de erro
            return res.status(400).render('cadastro', { error: 'Nome de usuário já existe'});
        }

        // Hash da senha antes de salvar no banco de dados
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Criar um novo cliente no banco de dados
        const clienteSalvo = await prisma.cliente.create({
            data: {
                usuario: username,
                senha: hashedPassword,
                celular: cellphone
            }
        });
        console.log("Cliente salvo com sucesso:", clienteSalvo);

        // Redirecionar para a página de login
        res.redirect('/login');
    } catch (error) {
        console.error("Erro ao processar o cadastro:", error);
        res.status(500).render('cadastro', { error: 'Erro ao processar o cadastro', username, cellphone });
    }
});


module.exports = router;
