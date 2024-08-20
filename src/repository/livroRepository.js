const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllLivros = async () => {
    return await prisma.livro.findMany();
}

const getLivroById = async (id)  => {
    return await prisma.livro.findUnique({
        where: { id }
    });
};

const createLivro = async (livroData) => {
    return await prisma.livro.create({
        data: livroData
    });
}

const updateLivro = async (id, livroAtualizar) => {
    return await prisma.livro.update({
        where: { id },
        data: livroAtualizar
    });
}

const deleteLivro = async (id) => {
    return await prisma.livro.delete({
        where: { id }
    });
}

module.exports = {
    getAllLivros,
    getLivroById,
    createLivro,
    updateLivro,
    deleteLivro
};