const { compra } = require('../service/compraService');

jest.mock('../infra/prismaClient', () => {
    const prismaMock = {
      $transaction: jest.fn(),
      exemplar: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      cliente: {
        update: jest.fn(),
      },
      transacao: {
        create: jest.fn(),
      },
      livro: {
        findUnique: jest.fn(),
      },
    };
    
    return {
      getPrisma: jest.fn(() => prismaMock),
    };
  });

jest.mock('express', () => ({
  Request: class Request {
    constructor() {
        this.session = { user: {} };
        this.body = {};
    }
  },
  Response: class Response {
    status = jest.fn().mockReturnThis(); 
    json = jest.fn();            
    send = jest.fn();              
  },
}));

describe('compra function', () => {
  let prismaMock;
  let req;
  let res;
  
  beforeEach(() => {
    const { getPrisma } = require('../infra/prismaClient');
    prismaMock = getPrisma();
    
    jest.clearAllMocks();

    req = new (require('express').Request)();
    res = new (require('express').Response)();

    prismaMock.$transaction.mockImplementation(async (callback) => {
      return await callback(prismaMock);
    });
  });


  describe('compra relizada com sucesso', () => {
    beforeEach(() => {
      req.session.user = { id: 1, saldo: 100 };
      req.body = { livroId: '123', estado: 'Novo' };
      prismaMock.exemplar.findUnique.mockResolvedValue({
        preco: 50,
        quantidade: 1,
        livroId: '123',
        estado: 'Novo',
      });
      prismaMock.livro.findUnique.mockResolvedValue({ titulo: 'Example Book' });
    });

    it('deve comitar a transacao, atualizar o saldo do usuario e a quantidade do livro', async () => {
        await compra(req, res); 
      

        expect(prismaMock.$transaction).toHaveBeenCalledWith(expect.any(Function));
      
        expect(prismaMock.exemplar.findUnique).toHaveBeenCalledWith(
            expect.objectContaining({
                where: {
                    livroId_estado: {
                        livroId: "123",
                        estado: 'Novo'
                    }
                }
            })
        );

        expect(prismaMock.cliente.update).toHaveBeenCalledWith(
          expect.objectContaining({ 
            data: {
            saldo: 50
          },
          where: { id: 1 }
        }));

        expect(prismaMock.exemplar.update).toHaveBeenCalledWith(
          expect.objectContaining({ 
            data: {
              quantidade: 0
          },
          where: {
              livroId_estado: {
                  livroId: "123",
                  estado: 'Novo'
              }
          }
        }));

        expect(prismaMock.livro.findUnique).toHaveBeenCalledWith(
            expect.objectContaining({
                where: {
                     id: "123"
                }
            })
        );

        expect(prismaMock.transacao.create).toHaveBeenCalledWith(
          expect.objectContaining({
            data: {
                clienteId: 1,
                livroId: '123',
                tituloLivro: 'Example Book',
                estado: 'Novo',
                data: expect.any(Date),
                tipo: 'Compra',
            }
          })
        );
      
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Compra realizada com sucesso!' });
      });
      
  });

  describe('saldo insuficiente', () => {
    beforeEach(() => {
      req.session.user = { id: 1, saldo: 40 };
      req.body = { livroId: '123', estado: 'Novo' };
      prismaMock.exemplar.findUnique.mockResolvedValue({
        preco: 50,
        quantidade: 1,
        livroId: '123',
        estado: 'Novo',
      });
    });

    it('deve retornar uma mensagem de saldo insuficiente', async () => {
      await compra(req, res);
      expect(prismaMock.$transaction).toHaveBeenCalled();
      expect(prismaMock.exemplar.findUnique).toHaveBeenCalled();

      expect(prismaMock.cliente.update).not.toHaveBeenCalled();
      expect(prismaMock.exemplar.update).not.toHaveBeenCalled();
      expect(prismaMock.transacao.create).not.toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: 'Saldo insuficiente!' });
    });
  });

  describe('sem estoque', () => {
    beforeEach(() => {
      req.session.user = { id: 1, saldo: 100 };
      req.body = { livroId: '123', estado: 'Novo' };
      prismaMock.exemplar.findUnique.mockResolvedValue({
        preco: 50,
        quantidade: 0,
        livroId: '123',
        estado: 'Novo',
      });
    });

    it('deve retornar uma mensagem de estoque insuficiente', async () => {
      await compra(req, res);

      expect(prismaMock.$transaction).toHaveBeenCalled();
      expect(prismaMock.exemplar.findUnique).toHaveBeenCalled();

      expect(prismaMock.cliente.update).not.toHaveBeenCalled();
      expect(prismaMock.exemplar.update).not.toHaveBeenCalled();
      expect(prismaMock.transacao.create).not.toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: 'Sem estoque' });
    });
  });

  describe('dados invalidos', () => {
    beforeEach(() => {
    });

    it('deve retornar uma mensagem de dados invalidos', async () => {
      await compra(req, res);

      expect(prismaMock.$transaction).toHaveBeenCalled();
      expect(prismaMock.exemplar.findUnique).not.toHaveBeenCalled();

      expect(prismaMock.cliente.update).not.toHaveBeenCalled();
      expect(prismaMock.exemplar.update).not.toHaveBeenCalled();
      expect(prismaMock.transacao.create).not.toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: 'Dados inválidos!' });
    });
  });
});
