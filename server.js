const express = require('express');
const app = express();

const livroRoutes = require('./routes/livro');

app.use('/livro', livroRoutes);

const port = process.env.PORT || 3500; 
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});