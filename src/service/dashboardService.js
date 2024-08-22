const express = require('express');
const session = require('express-session');

const getDashboard = (req,res)=>{
    if(req.session.user){
        res.render('dashboard');
    }else{
        res.send('voce precisa estar logado para acessar esta pagina');
    }
};

module.exports = getDashboard;