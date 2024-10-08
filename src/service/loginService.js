const bcrypt = require('bcryptjs');
const loginRepository = require('../repository/loginRepository');


const getLogin = (req,res)=>{

    if(req.session && req.session.user){
        console.log(req.session.user);
        res.json({
            usuario: req.session.user.usuario,
            telefone: req.session.user.celular
        });
    } else{
        res.status(401).send('Usuário não autenticado');
    }
};

const createLogin = async (req, res) => {
    const { usuario, senha } = req.body;
    if(!usuario || usuario.length < 4 || usuario.length > 50){
        return res.status(400).json({
            message: 'Usuário inválido',
        });
    }

    if(!senha || senha.length < 6 || senha.length > 20){
        return res.status(400).json({
            message: 'Senha inválida',    
        });
    }

    try {
        // Buscar o usuário no banco de dados
        const user = await loginRepository.getLogin(usuario);
        
        // Verifique se o usuário foi encontrado e se a senha está presente
        if (user && user.senha && bcrypt.compareSync(senha, user?.senha)) {
            // Se o usuário for encontrado e a senha estiver correta
            req.session.user = user; // Assumindo que você está usando sessões para autenticação
            res.redirect('/dashboard'); // Redirecionar para o dashboard ou página protegida
        } else {
            // Se o usuário não for encontrado ou a senha estiver incorreta
            res.status(401).send({ message: 'Usuário ou senha errados'});
        }
    } catch (error) {
        console.error('Erro ao processar o login:', error);
        res.status(500).send({ message: 'Erro ao processar o login' });
    }
};

const logout = (req, res) => {
    if (req.session.user) { 
        req.session.destroy((err) => {
            if (err) {
                console.error('Erro ao fazer logout:', err);
                return res.status(500).json({message:'Erro ao fazer logout'});
            }
            res.status(200).json({
                message: "Logou realizado com sucesso!"
            }); 
        });
    } else {
        res.status(400).json({message:'Nenhum usuário está logado'}); 
    }
};

module.exports = {
    getLogin,
    createLogin,
    logout
};