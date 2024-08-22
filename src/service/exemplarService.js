const exemplarRepository = require('../repository/exemplarRepository');
const livroRepository = require('../repository/livroRepository');

const getAllExemplares = async (req, res) =>{
    const exemplares = await exemplarRepository.getAllExemplares();
    res.status(200).json(exemplares);
}

const getExemplarUnico = async(req, res) =>{
    const { livroId, estado } = req.query;

    if(!livroId || !estado){
        res.status(400).json({ message: "Dados Incompletos" });
    }

    const exemplar = await exemplarRepository.getExemplarUnico(livroId, estado);
    if(!exemplar){
        res.status(404).send({ error: 'Exemplar não encontrado' });
        return;
    }
    res.send(exemplar);
}

const createExemplar = async(req, res) =>{
    const exemplar = req.body;
    
    if(!validarExemplar(res, exemplar)){
        return;
    }

    const livro = await livroRepository.getLivroById(exemplar.livroId);
    if(!livro){
        res.status(404).send({ error: 'Livro não encontrado' });
        return;
    }

   const exemplarSalvo = await exemplarRepository.createExemplar(exemplar);

   res.status(200).json(exemplarSalvo);
}

const deletarExemplar = async(req, res) =>{
    const { livroId, estado } = req.query;

    if(!livroId || !estado){
        res.status(400).json({ message: "Dados Incompletos" });
    }

    try{
        await exemplarRepository.deleteExemplar(livroId, estado);
        res.status(200).json({ message: `Exemplar deletado com sucesso` });
    }
    catch{
        res.status(404).json({ message: "Exemplar não encontrado" })
    }
}

const updateExemplar = async(req, res) =>{
    const { livroId, estado } = req.query;

    if(!livroId || !estado){
        res.status(400).json({ message: "Dados Incompletos" });
    }

    const exemplar = req.body;
    
    if(!validarExemplarEdicao(res, exemplar)){
        return;
    }
    
    try{
        const exemplarAtualizado = await exemplarRepository.updateExemplar(livroId, estado, exemplar);
        res.status(200).json(exemplarAtualizado);
    }
    catch{
        res.status(404).json({ message: "Exemplar não encontrado" })
    }
}

const validarExemplarEdicao = (res, exemplar) =>{
    if(!exemplar){
        res.status(400).json({ message: 'Dados Inválidos' });
        return false;
    }

    if(!exemplar.preco){
        res.status(400).json({ message: 'Preço Inválido' });
        return false;
    }

    if(!exemplar.quantidade){
        res.status(400).json({ message: 'Quantidade Inválida' });
        return false;
    }

    return true;
}

const validarExemplar = (res, exemplar) =>{
    if(!exemplar){
        res.status(400).json({ message: 'Dados Inválidos' });
        return false;
    }

    if(!exemplar.livroId){
        res.status(400).json({ message: 'Livro Inválido' });
        return false;
    }

    if(!exemplar.estado || !(["Novo", "Semi-Novo", "Usado"].includes(exemplar.estado))){
        res.status(400).json({ message: 'Estado de Conservação Inválido' });
        return false;
    }

    if(!exemplar.preco){
        res.status(400).json({ message: 'Preço Inválido' });
        return false;
    }

    if(!exemplar.quantidade){
        res.status(400).json({ message: 'Quantidade Inválida' });
        return false;
    }

    return true;
}

module.exports = {
    getAllExemplares,
    getExemplarUnico,
    createExemplar,
    deletarExemplar,
    updateExemplar
};