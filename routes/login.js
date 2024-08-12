const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('login');
});

router.post('/', (req,res)=>{
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if(user && bcrypt.compareSync(password, user.password)){
        req.session.user = user;
        res.redirect('/dashboard');
    }else{
        res.send('usuario ou senha errados');
    }
});

module.exports = router;