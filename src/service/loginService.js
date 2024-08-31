const bcrypt = require('bcryptjs');
const loginRepository = require('../repository/loginRepository');


const getLogin = (req,res)=>{
    res.render('login', {
        erro: '',
        usuario: '',
        cellphone: ''
    });
};

const createLogin = async (req, res) => {
    const { usuario, senha } = req.body;
    try {
        // Buscar o usuário no banco de dados
        const user = await loginRepository.getLogin(usuario);
        console.log(user);
        
        // Verifique se o usuário foi encontrado e se a senha está presente
        if (user && user.senha && bcrypt.compareSync(senha, user.senha)) {
            console.log(req.body);
            // Se o usuário for encontrado e a senha estiver correta
            req.session.user = user; // Assumindo que você está usando sessões para autenticação
            res.redirect('/dashboard'); // Redirecionar para o dashboard ou página protegida
        } else {
            // Se o usuário não for encontrado ou a senha estiver incorreta
            res.status(401).send('Usuário ou senha errados');
        }
    } catch (error) {
        console.error('Erro ao processar o login:', error);
        res.status(500).send('Erro ao processar o login');
    }
};

module.exports = {
    getLogin,
    createLogin
};