Para rodar o servidor, certifique-se que está dentro do diretório DesafioNodeJs\despesas-api, e então no terminal coloque node app.js.
Começando a falar sobre a inserção de novas despesas (POST), temos a página [localhost:3000/cadastro](http://localhost:3000/cadastro), que vai ser um formulário feito com Handlebar, que após preenchido, nos redireciona para
o endpoint [localhost:3000/api/despesas](http://localhost:3000/api/despesas), mostrando o id da despesa e sucess:true caso saia tudo como esperado. E se passarmos essa pagina (api/despesas) novamente na URL, mostrará
uma lista das despesas cadastradas do mês vigente (GET). Porém decidi colocar também, caso queira visualizar melhor, uma view desta lista na página [localhost:3000/listar](http://localhost:3000/listar).
