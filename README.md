# Trabalho 2 – Mashup de APIs

Martim Duarte  
Número de aluno: [31651]

Este projeto foi desenvolvido no âmbito da unidade curricular de PW da ESTG-IPVC. Consiste numa aplicação web que permite pesquisar países após o utilizador efetuar login. A aplicação consome e integra dados de três APIs REST externas, realizando um mashup de informações úteis sobre o país pesquisado. As pesquisas são guardadas no histórico do utilizador, que está persistido numa base de dados MongoDB.

A aplicação permite ao utilizador registar-se com nome de utilizador e password. Após autenticação, o utilizador pode aceder à funcionalidade de pesquisa, onde escreve o nome de um país. O servidor realiza então chamadas a três APIs: a Wikipedia REST API (para apresentar um resumo do país), a RestCountries API (para mostrar capital, população, moeda e bandeira) e a GNews API (para apresentar três notícias recentes sobre o país). Todos os pedidos às APIs são feitos no lado do servidor. Os resultados são integrados e enviados para o cliente para visualização.

A aplicação está publicada em:  
https://trabalho2-mashup-apis-martimd11.onrender.com

Para instalar e correr a aplicação localmente, é necessário ter o Node.js instalado. Primeiro, deve clonar-se o repositório do GitHub, aceder à pasta do projeto, instalar as dependências com `npm install`, e criar um ficheiro `.env` com as variáveis de ambiente necessárias: a URI de ligação à base de dados MongoDB, a chave secreta da sessão e a chave da API GNews. De seguida, a aplicação pode ser iniciada com `node app.js`, ficando disponível por defeito em `http://localhost:3000`.

A base de dados utilizada é MongoDB, e armazena os utilizadores com os seguintes dados: nome de utilizador, password (cifrada com bcrypt) e um array com os termos pesquisados. Sempre que um utilizador realiza uma nova pesquisa, o termo pesquisado é adicionado ao seu histórico.

A autenticação dos utilizadores é feita com a biblioteca Passport.js, utilizando a estratégia local. As passwords são guardadas de forma segura com hashing, e o sistema usa express-session para manter a sessão ativa. As rotas estão protegidas para que apenas utilizadores autenticados possam aceder à pesquisa.

Este projeto utiliza Node.js, Express, EJS como engine de templates, MongoDB com Mongoose, Passport para autenticação, Axios para chamadas HTTP e Render.com para publicação online. As APIs integradas são a Wikipedia REST API, RestCountries API e GNews API.

O repositório GitHub encontra-se em:  
https://github.com/teu-username/trabalho2-mashup-apis-martimd11


