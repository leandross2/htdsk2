# HOTDESK
[![Build Status](https://travis-ci.com/leandross2/htdsk2.svg?branch=master)](https://travis-ci.com/leandross2/htdsk2)
## API

O projeto foi feito utilizando

1. AdonisJs
2. yarn
3. postgres
4. vow
5. Migrations e seeds

### Setup

Utilize o comando yarn para instalar as dependências

```bash
yarn
```

### .env

altere o nome do aquivo `.env-example` para `.env` e preencha os valores das variáveis

### Migrations

Após preencher as variáveis no .env execute o comando no terminal dentro da pasta do projeto para criar as tabelas do banco.

```js
adonis migration:run
```

### Seeds

Após executar as migrations execute o comando para executar as seeds no DB

```js
adonis seed
```

### Executando a API

Para executar a api basta executar o comando

```js
adonis serve
```

## Testes

Para executar os testes automatizados da api execute o comando

```js
adonis test
```
