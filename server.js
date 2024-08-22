const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

app.use(cors({
    origin: '*'
}));

const livroRoutes = require('./src/routes/livro');
const exemplarRoutes = require('./routes/exemplar');


app.use('/livro', livroRoutes);
app.use('/exemplar', exemplarRoutes);


const port = process.env.PORT || 3500; 
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});