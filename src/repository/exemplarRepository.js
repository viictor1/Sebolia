const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllExemplares = async () => {
    return await prisma.exemplar.findMany();
}

const getExemplarUnico = async (id, estado)  => {
    return await prisma.exemplar.findUnique({
        where: {
            livroId_estado: {
                livroId: Number(id),
                estado: String(estado)
            }
        }
    });
};

const createExemplar = async (exemplar) => {
    return await prisma.exemplar.create({
        data: {
            estado: exemplar.estado,
            preco: exemplar.preco,
            quantidade: exemplar.quantidade,
            Livro: {
                connect: { id: exemplar.livroId }
            }
        }
    });
}

const deleteExemplar = async (id, estado) => {
    return await prisma.exemplar.delete({
        where: {
            livroId_estado: {
                livroId: Number(id),
                estado: String(estado)
            }
        }
    });
}

const updateExemplar = async (id, estado, exemplar) => {
    return await prisma.exemplar.update({
        where: {
            livroId_estado: {
                livroId: Number(id),
                estado: String(estado)
            }
        },
        data: {
            preco: exemplar.preco,
            quantidade: exemplar.quantidade,
        }
    });
}

module.exports = {
    getAllExemplares,
    getExemplarUnico,
    createExemplar,
    updateExemplar,
    deleteExemplar
};