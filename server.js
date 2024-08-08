const express = require('express');
const app = express();

const livroRoutes = require('./routes/livro');
const vendedorRoutes = require('./routes/vendedor');

app.use('/livro', livroRoutes);
app.use('/vendedor', vendedorRoutes);

const port = process.env.PORT || 3500; 
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});