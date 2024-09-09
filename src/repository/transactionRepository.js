const { getPrisma } = require("../infra/prismaClient");

const prisma = getPrisma();

const getHistorico = async (id) => {
    return await prisma.transacao.findMany({
        where: {
            clienteId: id
        }
    });
};

module.exports = {
    getHistorico
};