const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

users = [];

router.get('/',(req,res)=>{
    res.render('cadastro');
});

router.post('/',(req,res)=>{
    const {username,password} = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    users.push({username, password: hashedPassword});

    res.redirect('/login');
});

module.exports = router;