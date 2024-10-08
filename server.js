const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(session({
    secret: 's983245803oibf-rji',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));



const livroRoutes = require('./src/routes/livroRoute');
const cadastroRoutes = require('./src/routes/cadastro');
const loginRoutes = require('./src/routes/login');
const dashboardRoutes = require('./src/service/dashboardService');
const indexRoutes = require('./src/service/indexService');
const logoutRoutes = require('./src/routes/logout');
const exemplarRoutes = require('./src/routes/exemplarRoute');
const compraRoute = require('./src/routes/compra');
const vendaRoute = require('./src/routes/venda');
const historicoRoute = require('./src/routes/historico');
const perfilRoutes = require('./src/routes/perfil');

app.use('/exemplar', exemplarRoutes);
app.use('/livro', livroRoutes);
app.use('/cadastro', cadastroRoutes);
app.use('/login', loginRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/compra', compraRoute);
app.use('/venda', vendaRoute);
app.use('/logout', logoutRoutes);
app.use('/historico', historicoRoute);
app.use('/perfil', perfilRoutes);
app.use('/', indexRoutes);

const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
