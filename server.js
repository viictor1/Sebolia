const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const login = "tico";
const password = "123";
app.use(express.json());


const livroRoutes = require('./routes/livro');


app.use('/livro', livroRoutes);
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({ secret: 'jasdf9jasdf809-1' }));

// Configuração do mecanismo de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.post('/',(req,res)=>{
    if(req.body.password == password && req.body.login == login){
        //logado com sucesso
        req.session.login = login;
        res.render('logado');
    }else{

        res.render('index');
    }
})

app.get('/', (req, res) => {
    if(req.session.login){
        res.render('logado');
    }else{

        res.render('index'); // Certifique-se de que você tenha um arquivo 'index.ejs' na pasta 'views'
    }
});

const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
