const  transactionRepository = require('../repository/transactionRepository');

const getHistorico = async (req, res) =>{
    const user = req.session.user;
    const historico = await transactionRepository.getHistorico(user.id);
    res.status(200).json(historico);
}

module.exports = {
    getHistorico
};