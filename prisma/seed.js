const cadastroRepository = require("../src/repository/cadastroRepository");
const { getPrisma } = require("../infra/prismaClient");

const prisma = getPrisma();

async function main() {

    const admin = await cadastroRepository.createCadastro(
        {
            usuario: "admin",
            senha: "$2a$08$set/Uetf4u4qiR8F1AP1su7v69e84lTf3uz4j6AN1kNW1KuQIlcQ.",
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