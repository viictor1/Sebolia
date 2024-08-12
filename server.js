const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret: 's983245803oibf-rji',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.json());

const livroRoutes = require('./routes/livro');
const cadastroRoutes = require('./routes/cadastro');
const loginRoutes = require('./routes/login');
const dashboardRoutes = require('./routes/dashboard');
const indexRoutes = require('./routes/index');

app.use('/livro', livroRoutes);
app.use('/cadastro', cadastroRoutes);
app.use('/login', loginRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/', indexRoutes);

const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
