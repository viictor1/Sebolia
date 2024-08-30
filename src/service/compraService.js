const compra = async (req, res) =>{
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
        
            if (user.saldo < exemplar.preco) {
                throw new Error('Saldo insuficiente!');
            }
    
            if (exemplar.quantidade == 0){
                throw new Error('Sem estoque');
            }
        
            await trx.cliente.update({
                where: { id: user.id },
                data: { saldo: user.saldo - exemplar.preco }
            });
        
            await trx.transacao.create({
                data: {
                    clientId: user.id,
                    livroId: exemplar.livroId,
                    estado: exemplar.estado,
                    data: new Date(),
                    tipo: "Compra"
                }
            });
        });
    } catch(e){
        res.status(400).send({ message: e.message });
    }

    res.status(200).json({ message: 'Compra realizada com sucesso!' });
}

module.exports = {
    compra
};