const cadastroRepository = require("../src/repository/cadastroRepository");
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

    const hashedPassword = bcrypt.hashSync("admin123", 8);

    const admin = await cadastroRepository.createCadastro(
        {
            usuario: "admin",
            senha: hashedPassword,
            celular: "44444444444",
            role: "admin"
        }
    )

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })