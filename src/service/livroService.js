const livroRepository = require('../repository/livroRepository');

const getAllLivros = async (req, res) =>{
    const livros = await livroRepository.getAllLivros();
    res.status(200).json(livros);
}

const getLivroById = async (req, res) =>{
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const livro = await livroRepository.getLivroById(id);
        res.status(200).json(livro);
    } catch (error) {
        res.status(404).send({ error: 'Livro não encontrado' });
    }

}

const createLivro = async (req, res) =>{
    const livroData = req.body;
    if(!validarLivro(res, livroData)){
        return;
    }

    const livroSalvo = await livroRepository.createLivro(
        {
            titulo: livroData.titulo,
            autor: livroData.autor,
            editora: livroData.editora,
            ano: livroData.ano
        }
    );
    
    res.status(200).json(livroSalvo);
}

const deleteLivro = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(isNaN(id)){
        res.status(400).json({ message: 'ID Inválido' });
        return;
    }
    
    try{
        const livro = await livroRepository.deleteLivro(id);
        res.status(200).json({ message: `${livro.titulo} deletado com sucesso` });
    }
    catch(e){
        res.status(404).json({ message: "Erro ao deletar" })
    }
}

const updateLivro = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(isNaN(id)){
        res.status(400).json({ message: 'ID Inválido' });
        return;
    }

    const livroData = req.body;
    if(!validarLivro(res, livroData)){
        return;
    }
    
    try{
        const livroAtualizado = await livroRepository.updateLivro(
            id,
            {
                titulo: livroData.titulo,
                autor: livroData.autor,
                editora: livroData.editora,
                ano: livroData.ano
            }
        );
        res.status(200).json(livroAtualizado);
    }
    catch{
        res.status(404).json({ message: "Erro ao salvar" })
    }

}


const validarLivro = (res, livro) =>{
    if(!livro){
        res.status(400).json({ message: 'Dados Inválidos' });
        return false;
    }

    if(!livro.titulo){
        res.status(400).json({ message: 'Título Inválido' });
        return false;
    }

    if(!livro.autor){
        res.status(400).json({ message: 'Autor Inválido' });
        return false;
    }

    if(!livro.editora){
        res.status(400).json({ message: 'Editora Inválido' });
        return false;
    }

    livro.ano = parseInt(livro.ano);

    if(!livro.ano || typeof(livro.ano) != "number"){
        res.status(400).json({ message: 'Ano Inválido' });
        return false;
    }

    return true;
}

module.exports = {
    getAllLivros,
    getLivroById,
    createLivro,
    updateLivro,
    deleteLivro
};