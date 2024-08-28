const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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