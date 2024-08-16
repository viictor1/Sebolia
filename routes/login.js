const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.get('/',(req,res)=>{
    res.render('login');
});

router.post('/', async(req,res)=>{
    const { username, password } = req.body;
    const user = await prisma.cliente.findFirst({
        where:{
            usuario: username
        }
    });

    if(user && bcrypt.compareSync(password, user.senha)){
        req.session.user = user;
        res.redirect('/dashboard');
    }else{
        res.send('usuario ou senha errados');
    }
});

module.exports = router;