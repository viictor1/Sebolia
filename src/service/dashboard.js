const express = require('express');
const router = express.Router();
const session = require('express-session');

router.get('/',(req,res)=>{
    if(req.session.user){
        res.render('dashboard');
    }else{
        res.send('voce precisa estar logado para acessar esta pagina');
    }
});

module.exports = router;