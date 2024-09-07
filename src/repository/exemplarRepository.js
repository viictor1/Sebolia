const { getPrisma } = require("../infra/prismaClient");

const prisma = getPrisma();

const getAllExemplares = async (id) => {
    return await prisma.exemplar.findMany({
        where: {
            livroId: Number(id)
        }
    });
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
            preco: parseFloat(exemplar.preco),
            quantidade: Number(exemplar.quantidade),
            Livro: {
                connect: { id: Number(exemplar.livroId) }
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
            preco: parseFloat(exemplar.preco),
            quantidade: Number(exemplar.quantidade),
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