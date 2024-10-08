const exemplarRepository = require('../repository/exemplarRepository');
const livroRepository = require('../repository/livroRepository');

const getAllExemplares = async (req, res) =>{
    const { livroId } = req.query;

    if(!livroId){
        res.status(400).json({ message: "Dados Incompletos" });
    }

    let exemplares = await exemplarRepository.getAllExemplares(livroId);
    exemplares = await Promise.all(exemplares.map(async (exemplar) => {
        exemplar.livroTitulo = (await livroRepository.getLivroById(exemplar.livroId)).titulo;
        return exemplar;
    }));
    
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
    exemplar.livroTitulo = (await livroRepository.getLivroById(exemplar.livroId)).titulo;

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

   let exemplarEditar = await exemplarRepository.getExemplarUnico(exemplar.livroId, exemplar.estado);
   if(exemplarEditar){
        exemplarEditar = await exemplarRepository.updateExemplar(exemplar.livroId, exemplar.estado, exemplar);
        return res.status(200).json(exemplarEditar);
   }
   
   const exemplarSalvo = await exemplarRepository.createExemplar(exemplar);

   res.status(200).json(exemplarSalvo);
}

const deletarExemplar = async(req, res) =>{
    const { livroId, estado } = req.query;

    if(!livroId || !estado){
        return res.status(400).json({ message: "Dados Incompletos" });
    }

    try{
        await exemplarRepository.deleteExemplar(livroId, estado);
        res.status(200).json({ message: `Exemplar deletado com sucesso` });
    }
    catch(e){
        res.status(404).json({ message: e.message })
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

    if(!exemplar.quantidade){
        res.status(400).json({ message: 'Quantidade Inválida' });
        return false;
    }

    if(exemplar.quantidade > 1000){
        res.status(400).json({ message: 'Quantidade não pode ultrapassar 1000' });
        return false;
    }

    if(exemplar.preco > 1000.00){
        res.status(400).json({ message: 'Preço não pode ultrapassar R$ 1000,00' });
        return false;
    }

    if(!exemplar.preco){
        res.status(400).json({ message: 'Preço Inválido' });
        return false;
    }

    if(exemplar.preco > 1000.00){
        res.status(400).json({ message: 'Preço não pode ultrapassar R$ 1000,00' });
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