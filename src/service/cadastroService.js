const bcrypt = require('bcryptjs');
const cadastroRepository = require('../repository/cadastroRepository');

// Rota para exibir o formulário de cadastro
const getCadastro = (req, res) => {
    res.render('cadastro', {
        error: '',
        nome: '',
        usuario: '',
        telefone: ''
    });
}

// Rota para processar o formulário de cadastro
const createCadastro = async (req, res) => {
    const { usuario, senha, confirmarSenha, telefone } = req.body;
    console.log(req.body);
    if(!senha || senha.length < 6){
        return res.status(400).render('cadastro',{
            error: 'A senha deve ter no minimo 6 caracteres',
            usuario,
            telefone
            
        });
    }
    if(!usuario || usuario.length < 4){
        return res.status(400).render('cadastro',{
            error: 'o usuario deve ter no minimo 4 caracteres',
            usuario,
            telefone
        });
    }
    if(senha != confirmarSenha){
        return res.render('cadastro', {
            error: 'As senhas devem ser iguais',
            usuario,
            telefone
        });
    }
    
    try {
        // Verificar se o nome de usuário já existe
        const existingUser = await cadastroRepository.getCadastro(usuario, telefone);

        console.log("Existing User:", existingUser); // Verifique o valor retornado

        if (existingUser) {
            // Se o usuário já existe, renderizar o formulário novamente com uma mensagem de erro
            return res.status(400).render('cadastro', {
                error: 'Nome de usuário ou telefone já existe',
                usuario,
                telefone
            });
        }


        // Hash da senha antes de salvar no banco de dados
        const hashedPassword = bcrypt.hashSync(senha, 8);

        // Criar um novo cliente no banco de dados
        const clienteSalvo = await cadastroRepository.createCadastro(
            {
                nome: this.name,
                usuario: usuario,
                senha: hashedPassword,
                celular: telefone
            }
        );

        console.log("Cliente salvo com sucesso:", clienteSalvo);

        // Redirecionar para a página de login
        res.redirect('/login');
    } catch (error) {
        console.error("Erro ao processar o cadastro:", error);
        res.status(500).render('cadastro', { error: 'Erro ao processar o cadastro', usuario, telefone });
    }
};

const deleteCadastro = async (req,res) => {
    const { id } = req.params;

    try{
        const cliente = cadastroRepository.deleteCadastro(id);
        res.status(200).json({message: `${cliente.nome} deletado com sucesso`});
        //     where:{
        //         id: parseInt(id)
        //     }
        // });
        if(!cliente){
            return res.status(404).json({message: 'cliente nao encontrado'});
        }
        res.status(200).json({message: 'cliente deletado com sucesso'});
        
    } catch(error){
        
        console.error("erro ao deletar o cliente", error);
        res.status(500).json({message: "erro ao deletar o cliente"});
    }
};

const updateCadastro = async (req, res) => {
    const { id } = req.params;
    const { usuario, password, telefone } = req.body;

    if(isNaN(id)){
        res.status(400).json({message: 'ID inválido'});
        return;
    }

    try {
        // Hash da nova senha, se fornecida
        let updatedData = {
            usuario: usuario,
            celular: telefone,
        };

        if (senha) {
            updatedData.senha = bcrypt.hashSync(senha, 8);
        }

        // Atualiza o cliente no banco de dados
        const clienteAtualizado = await cadastroRepository.updateCadastro(
            id,
            {
                nome: this.name,
                usuario: usuario,
                senha: senha,
                celular: telefone
            }
            
            // where: { id: parseInt(id) },  // Certifique-se de converter o id para inteiro
            // data: updatedData,
        );

        res.json({ message: 'Cliente atualizado com sucesso', clienteAtualizado });
    } catch (error) {
        console.error('Erro ao atualizar o cliente:', error);
        res.status(500).json({ message: 'Erro ao atualizar o cliente' });
    }
};



module.exports = {
    getCadastro,
    createCadastro,
    deleteCadastro,
    updateCadastro
};
