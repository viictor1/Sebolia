const express = require('express');
const app = express();

const livroRoutes = require('./routes/livro');
const vendedorRoutes = require('./routes/vendedor');

app.use('/livro', livroRoutes);
app.use('/vendedor', vendedorRoutes);

<<<<<<< HEAD
const port = process.env.PORT || 3500; 
=======
const port = process.env.PORT || 3000; 
>>>>>>> e90617b (chore: base inicial)
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});