const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');

router.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: true
}));

let users = [];

router.get('/',(req,res)=>{
    res.render('index');
});

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