const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json());

const livroRoutes = require('./routes/livro');
const cadastroRoutes = require('./routes/cadastro');

app.use('/livro', livroRoutes);
app.use('/cadastro', cadastroRoutes);


app.get('/login',(req,res)=>{
    res.render('login');
});

app.post('/login', (req,res)=>{
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if(user && bcrypt.compareSync(password, user.password)){
        req.session.user = user;
        res.redirect('/dashboard');
    }else{
        res.send('usuario ou senha errados');
    }
});

app.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.send('bem vindo ao dashboard');
    }else{
        res.send('voce precisa estar logado para acessar esta pagina');
    }
});

const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
