# Sebolia Backend

Backend do Sebolia, sistema para gerenciamento de um Sebo, em que é possível se registrar, gerenciar sua conta, comprar e vender livros

# Sebolia Frontend

- [frontend](https://github.com/BorniaPedro/sebolia-frontend)


# Instalação

## Pré requisitos

Certifique-se de que você tenha as seguintes ferramentas instaladas:

- [docker](https://www.docker.com/)

## Git Clone

Siga os passos abaixo para rodar o projeto localmente:

1. Clone o repositório

```bash
git clone https://github.com/viictor1/Sebolia.git
```

2. Navegue até o diretório do projeto:

```bash
cd sebolia-frontend
```

3. Buildar a imagem
```bash
docker build -t sebolia .
```

4. Rodar o container
```bash
docker run -p 3500:3500 sebolia
```

A aplicação estará disponível em [http://localhost:3500](http://localhost:3500).
