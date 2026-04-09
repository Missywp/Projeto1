Este projeto foi desenvolvido utilizando o conceito de CRUD (Create, Read, Update, Delete) para o gerenciamento de informações. Para manter a organização, as pastas foram separadas entre o Beck-end e o Front-end.

No Beck-end, temos a estrutura que processa os dados e faz a ponte com o servidor. É aqui que também está guardada a minha base de dados (os arquivos SQL), garantindo que as informações fiquem salvas. As pastas dentro dele organizam as rotas e os controladores do sistema.

No Front-end, temos a pasta reactproject, que contém toda a interface visual feita em React. É por aqui que o usuário interage com o projeto, vê as imagens e os dados dos personagens.

Para o sistema funcionar, você deve abrir o terminal e instalar as dependências que foram ignoradas pelo Git. Utilize os comandos abaixo dentro das pastas específicas:

No Beck-end:

npm install (para baixar as bibliotecas)

node index.js (para ligar o servidor)

No Front-end (dentro de reactproject):

npm install

npm install react-router-dom

npm start (para abrir o projeto no navegador)
