const { PrismaClient } = require('@prisma/client');
// const { getCadastro } = require('../service/cadastro');

const prisma = new PrismaClient();

const getCadastro = async (username, cellphone) => {
    return await prisma.cliente.findFirst({
        where: {
            OR:[
                {usuario: username},
                { celular: cellphone}
            ]
        }
    });
};

const createCadastro = async (cadastroData) => {
    return await prisma.cliente.create({
        data: cadastroData
    })
};

const updateCadastro = async (id, cadastroAtualizar) => {
    return await prisma.cliente.update({
        where: { id: parseInt(id) },
        data: cadastroAtualizar
    });
};

const deleteCadastro = async (id) => {
    return await prisma.cliente.delete({
        where: {id:parseInt(id)}
    });
};

module.exports = {
    getCadastro,
    createCadastro,
    deleteCadastro,
    updateCadastro
};

