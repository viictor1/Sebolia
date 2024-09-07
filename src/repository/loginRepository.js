const { getPrisma } = require("../infra/prismaClient");

const prisma = getPrisma();

const getLogin = async (username) => {
    return await prisma.cliente.findFirst({
        where: {
            usuario: username
        }
    });
};

module.exports = {
    getLogin
};