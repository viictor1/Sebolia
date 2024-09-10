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

    if(!usuario || usuario.length < 4 || usuario.length > 50){
        return res.status(400).json({
            message: 'o usuario deve ter entre 4 e 50 caracteres',
        });
    }
    if(!senha || senha.length < 6 || senha.length > 20){
        return res.status(400).json({
            message: 'A senha deve ter entre 6 e 20 caracteres',    
        });
    }
    if(!confirmarSenha || senha != confirmarSenha){
        return res.status(400).json({
            message: 'As senhas devem ser iguais',
        });
    }

    if(telefone.length != 11 || isNaN(telefone)){
        return res.status(400).json({
            message: 'Telefone inválido'
        });
    }
    
    try {
        // Verificar se o nome de usuário já existe
        const existingUser = await cadastroRepository.getCadastro(usuario, telefone);

        console.log("Existing User:", existingUser); // Verifique o valor retornado

        if (existingUser) {
            // Se o usuário já existe, renderizar o formulário novamente com uma mensagem de erro
            return res.status(400).json({
                message: 'Nome de usuário ou telefone já existe',
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

        res.status(200).json({ message: "Cliente salvo com sucesso:" })

        // Redirecionar para a página de login
    } catch (error) {
        console.log("oii")
        res.status(500).json({ message: "Erro ao processar o cadastro" })
    }
};

const deleteCadastro = async (req,res) => {
    const user = req.session.user;

    try{
        const cliente = cadastroRepository.deleteCadastro(user.id);
        //     where:{
        //         id: parseInt(id)
        //     }
        // });
        if(!cliente){
            return res.status(404).json({message: 'cliente nao encontrado'});
        }
        res.status(200).json({message: `${cliente.nome} deletado com sucesso`});
        
    } catch(error){
        
        console.error("erro ao deletar o cliente", error);
        res.status(500).json({message: "erro ao deletar o cliente"});
    }
};

const updateCadastro = async (req, res) => {
    const { usuario, celular } = req.body;
    const user = req.session.user;

    if(!usuario || !celular){
        return res.status(400).json({message: 'Usuário e celular são obrigatórios'});
    }

    if(usuario.length < 4 || usuario.length > 50){
        return res.status(400).json({message: 'O nome de usuário precisa ter entre 4 e 50 caracteres'});

    }
    
    if(celular.length != 11 || isNaN(celular)){
        return res.status(400).json({message: 'Telefone precisa ter 11 dígitos'});
    }

    try {
        const clienteAtualizado = await cadastroRepository.updateCadastro(
            user.id,
            {
                usuario: usuario,
                celular: celular
            }
            
        );
        req.session.user = clienteAtualizado;

        res.status(200).json({ message: 'Cliente atualizado com sucesso', clienteAtualizado });
    } catch (error) {
        console.error('Erro ao atualizar o cliente:', error);
        res.status(500).json({ message: 'Erro ao atualizar o cliente' });
    }
};

const alterarSenha = async (req, res) => {
    const { senhaAntiga, senhaNova } = req.body;
    try {
        // Buscar o usuário no banco de dados
        const user = req.session.user;
        
        if(senhaNova.length < 6) {
            return res.status(401).json({ message: "A senha precisa ter no mínimo 6 dígitos" })
        }

        if(senhaNova.length > 20) {
            return res.status(401).json({ message: "A senha precisa ter no máximo 20 dígitos" })
        }
        
        
        // Verifique se o usuário foi encontrado e se a senha está presente
        if (senhaAntiga && senhaNova && bcrypt.compareSync(senhaAntiga, user?.senha)) {
            const clienteAtualizado = await cadastroRepository.updateCadastro(
                user.id,
                {
                    senha: bcrypt.hashSync(senhaNova, 8)
                }
            )
            req.session.user = clienteAtualizado; 
            return res.status(200).send({ message: 'Senha atualizada com sucesso!'});
        } else {
            // Se o usuário não for encontrado ou a senha estiver incorreta
            return res.status(401).send({ message: 'Senha Incorreta'});
        }
    } catch (error) {
        console.error('Erro ao processar o login:', error);
        return res.status(500).send({ message: 'Erro ao processar o login' });
    }
};

const adicionarSaldo = async (req, res) => {
    const { saldo } = req.body;
    let user = req.session.user;
    if(saldo > 100) {
        return res.status(400).json({ message: 'Não é possível adicionar mais de 100 de uma vez' });
    }
    try {
        user = await cadastroRepository.updateCadastro(
            user.id,
            {
                saldo: Number(user.saldo) + Number(saldo)
            }
            
        );
        req.session.user = user;
        
        res.status(200).json({ message: 'Saldo adicionado com sucesso' });
    } catch (error) {
        console.error('Erro ao adicionar saldo:', error);
        res.status(500).json({ message: 'Erro ao adicionar saldo' });
    }
}



module.exports = {
    getCadastro,
    createCadastro,
    deleteCadastro,
    updateCadastro,
    alterarSenha,
    adicionarSaldo
};
