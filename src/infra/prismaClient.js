const { PrismaClient } = require("@prisma/client");

let prisma = null;

const getPrisma = () =>{
    if(!prisma){
        prisma = new PrismaClient();
    }

    return prisma;
}

module.exports = {
    getPrisma
}