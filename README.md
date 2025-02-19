🐾 Sistema de Adoção de Pets

Este é um projeto full-stack desenvolvido para facilitar a adoção de animais. O sistema permite que usuários cadastrem e adotem pets, gerenciando informações por meio de uma API conectada a um banco de dados MongoDB.

🚀 Tecnologias Utilizadas

Backend:

Node.js

Express.js

MongoDB

Mongoose (ODM para MongoDB)

Multer (para upload de imagens)

Cloudinary (armazenamento de imagens)

JSON Web Token (JWT) para autenticação

Frontend:

React.js

Axios (para comunicação com a API)

React Router (para navegação entre páginas)

📌 Funcionalidades

Cadastro e login de usuários

Autenticação por JWT

Cadastro, edição e remoção de pets

Upload e gerenciamento de fotos de pets

Adoção de pets

Listagem de pets cadastrados

🛠️ Como Executar o Projeto

📦 Backend

Clone o repositório:

git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio/backend

Instale as dependências:

npm install

Configure as variáveis de ambiente (arquivo .env):

MONGO_URI=sua-string-de-conexao
JWT_SECRET=sua-chave-secreta
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=sua-api-secret

Inicie o servidor:

npm start

🎨 Frontend

Acesse a pasta do frontend:

cd ../frontend

Instale as dependências:

npm install

Inicie o projeto:

npm start

📄 Licença

Este projeto está sob a licença MIT.
