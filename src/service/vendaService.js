const { getPrisma } = require("../infra/prismaClient");

const prisma = getPrisma();

const venda = async (req, res) =>{
    const user = req.session.user;
    const dados = req.body;


    try{
        await prisma.$transaction(async (trx) => {
            const exemplar = await trx.exemplar.findUnique({
                where: {
                    livroId_estado: {
                        livroId: dados.livroId,
                        estado: dados.estado
                    }
                }
            });
        
            await trx.cliente.update({
                where: { id: user.id },
                data: { saldo: user.saldo + exemplar.preco }
            });

            await trx.exemplar.update({
                data: { quantidade: exemplar.quantidade + 1},
                where: {
                    livroId_estado: {
                        livroId: dados.livroId,
                        estado: dados.estado
                    }
                }
            })

            exemplar.tituloLivro = (await trx.livro.findUnique({ where: { id: exemplar.livroId }})).titulo;

            await trx.transacao.create({
                data: {
                    clienteId: user.id,
                    livroId: exemplar.livroId,
                    tituloLivro: exemplar.tituloLivro,
                    estado: exemplar.estado,
                    data: new Date(),
                    tipo: "Venda"
                }
            });

        });
    } catch(e){
        console.log(e.message)
        res.status(400).send({ message: e.message });
        return;
    }

    res.status(200).json({ message: 'Venda realizada com sucesso!' });
}

module.exports = {
    venda
};