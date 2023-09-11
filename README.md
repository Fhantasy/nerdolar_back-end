## Projeto Nerdolar - Back End

Esse é o back end do projeto de estudo no qual criei um site de Rede Social com um back end usando Node.js, Express e um banco de dados PostgreSQL.

## Notas

FEITO COM PROPÓSITO DE ESTUDO

Uso Typescript e para estilização Bootstrap, Reactstrap e Sass

Feito com Node.js e Express

Utilizando AdminJS para fazer o painel do administrador  
Bcrypt para criptografar as senhas de usuários no banco de dados  
Json Web Token para gerar um token de autentificação

## Executar em desenvolvimento

Passo 1: Executar no terminal "npm install" para instalar as dependencias.

Passo 2: Criar um .env na raiz do projeto com as variaveis indicadas no .env.example. No ADMINJS_COOKIE_PASS e JWT_KEY
coloque as senhas que quiser e no DATABASE_URL coloque uma url do banco de dados PostgreSQL no formato
"postgres://SeuUsername:SuaSenha@localhost:5432/NomeDaSeuBancoDeDados" (Tem que ter o PostgreSQL instalado com um usuario criado) PS: No nome do seu banco de dados coloque o nome que você quer para criar, não precisa criar um banco de dados antes.

Passo 3: Execute no terminal "sequelize-cli db:create" para criar o banco de dados, "npx sequelize-cli db:migrate" para criar
as tabelas e "npx sequelize-cli db:seed:all" para criar o usuário Administrador.

Passo 4: Execute no terminal "npm run dev" para iniciar o servidor. (Acesse "http://localhost:3000/admin" para acessar o painel de administração com o email "admin@email.com" e senha "123456")
