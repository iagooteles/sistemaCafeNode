# Backend Cafe Node.js

Este projeto é a parte backend do sistema **cafe-nodejs**, desenvolvido com Node.js e Express. O backend gerencia usuários, categorias, produtos e faturas para um sistema de café.

## Tecnologias Usadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework web para construir APIs.
- **MySQL**: Sistema de gerenciamento de banco de dados.
- **Docker**: Plataforma para desenvolver, enviar e executar aplicações em contêineres.
- **Cors**: Middleware para permitir requisições CORS.
- **dotenv**: Para carregar variáveis de ambiente de um arquivo `.env`.
- **EJS**: Motor de template para renderizar HTML.
- **html-pdf**: Para gerar arquivos PDF a partir de HTML.
- **jsonwebtoken**: Para autenticação baseada em tokens.
- **mysql**: Driver MySQL para Node.js.
- **mysql2**: Uma versão mais moderna do driver MySQL para Node.js.
- **nodemailer**: Para enviar e-mails a partir da aplicação.
- **path**: Módulo do Node.js para manipulação de caminhos de arquivos.
- **uuid**: Para gerar identificadores únicos.

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/iagooteles/sistemaCafeNode.git
cd sistemaCafeNode
cd backend-cafe-nodejs
```

2. Instale as dependências:

```bash
npm install;
```

3. Crie um arquivo `.env` na raiz do projeto e adicione suas variáveis de ambiente. Você vai precisar de:

```bash
   # Porta em que o servidor irá rodar
   PORT=8080

   # Porta do banco de dados MySQL
   DB_PORT=3307
   
   # Host onde o banco de dados está rodando (pode ser localhost se estiver rodando localmente)
   DB_HOST=localhost
   
   # Nome de usuário para acessar o banco de dados MySQL
   DB_USERNAME=root
   
   # Senha para acessar o banco de dados MySQL, por padrão recomenda-se usar 'root_password'
   DB_PASSWORD=root_password
   
   # Nome do banco de dados a ser utilizado
   DB_NAME=cafenode 

   # Token de acesso para autenticação (por exemplo, JWT)
   ACCESS_TOKEN=455d0e834f06d7949705987f13da1047c2a85c1c938b05e36876627434906b54f8f67430f73150c24fcf312890e35c94d2b22ea5dc39faeacc5bc4229b852ebd

   # E-mail utilizado para enviar mensagens (ex.: envio de notificações ou recuperação de senha)
   # OBS: Não é necessário, apenas se quiser testar a função de receber email.
   EMAIL="Seu email aqui"
   
   # Senha do e-mail para autenticação
   # OBS: Não é necessário, apenas se quiser testar a função de receber email.
   PASSWORD="Sua senha"

   # Nome de usuário padrão para acesso (ex.: para autenticação ou referência em processos)
   USER=user
```

## Configuração do Banco de Dados com Docker
O projeto utiliza o Docker para gerenciar o banco de dados MySQL. Para iniciar o banco de dados, você pode usar o docker-compose:

1. Execute o Docker Compose:

```bash
docker-compose up -d
```

2. Acesse o MySQL no contêiner:

```bash
docker exec -it backend-cafe-nodejs-mysql-1 mysql -u root -p
```

3. Execute o seed.sql para criar e popular as tabelas necessárias, ou utilize as queries diretamente em uma plataforma como o MySQL Workbench:
```bash
docker exec -i backend-cafe-nodejs-mysql-1 mysql -u root -p'(SUA_SENHA_DEFINIDA_NO_ARQUIVO_.ENV_AQUI || root_password)' < seed.sql
```

## Inicialização do servidor: 
Para iniciar o servidor, use o comando:

```bash
npm start
```

4. Com o servidor rodando, você pode executar as instruções na pasta do frontend.