# GestaoDeEstoque-PDS
<br>
<h3> Membros </h3>
Hélio Martins de Araújo Costa Neto - 2017068750 - Full Stack
<br>
Kaio Lucas de Sá - 2019006850 - Full Stack
<br>
Leandro Diniz Silva - 2019105718 - Full Stack
<br>
Pedro Cimini Mattos de Freitas - 2019007031 - Full Stack
<br>

<h3> Objetivo </h3>
O sistema tem como objetivo fazer a gestão do controle de itens no estoque de uma empresa com multiplos armazens.
<br>
O sistema vai ser capaz de mostrar em qual lugar um item se encontra entre todos os armazens alem de tambem exibir todo o caminho de armazens que já passou. Vai existir um usuário "Gerente de Equipe" o mesmo é quem vai dar permissão aos gerentes de armazen para aceitar e rejeitar itens de acordo com quantos itens chegaram corretamente ou incorretamente.
<br>

<h3> Ferramentas </h3>
<br>
Para o desenvolvimento do front-end usaremos do framework de javascript VUE-JS
<br>
O back-end sera feito em node e o banco de dados escolhidos é o SQlite para facilitar a implementação em servidores locais

<h3>Backlog de Produto</h3>

1. Como usuário gostaria de me cadastrar no sistema.
2. Como usuário gostaria de registrar um novo produto no sistema.
3. Como usuário gostaria de registrar entradas e saídas de um produto no estoque.
4. Como usuário gostaria de localizar onde um produto se encontra.
5. Como usuário gostaria de me registrar no sistema.
6. Como usuário gostaria de solicitar permissão de controle em um estoque.
7. Como usuário gostaria de saber quais entradas estão para chegar em um estoque que controlo.
8. Como gerente de estoque gostaria de adicionar e remover estoques.
9. Como gerente de estoque gostaria de definir as permissões de usuários em cada estoque.
10. Como gerente de estoque gostaria de ter um relatório de entradas e saídas de um estoque.
11. Como gerente de estoque gostaria de identificar qual usuário esta realizando mais entradas/saídas.
12. Como administrador gostaria de modificar o tipo de usuário de um usuário.
13. Como administrador gostaria de modificar as permissões de um usuário.
14. Como administrador gostaria de adicionar e remover estoques.
15. Como administrador gostaria de adicionar e remover usuários.
16. Como administrador gostaria de adicionar e remover produtos.

<h4>Backlog do Sprint</h4>

* História #1: Como gerente de estoque gostaria de adicionar e remover estoques.

| # | Tarefas | Responsáveis |
| --- | ---- | ---- |
|1| Instalar banco de dados e criar as tabelas necessárias para o estoque| Leandro Diniz |
|2| Instalar Node e Vue.js | Hélio Martins |
|3| Criar e testar uma primeira função unitária usando JEST | Pedro Cimini |
|4| Implementar tela de cadastro de estoque | Kaio Lucas |
|5| Implementar tela de listagem de estoque | Kaio Lucas |
|6| Implementar na tela de listagem os caminhos para se remover / editar um estoque| Kaio Lucas 
|7| Implementar back-end do cadastro de estoque | Pedro Cimini |
|8| Implementar a edição de um estoque | Pedro Cimini |
|9| Implementar back-end da listagem de estoques | Hélio Martins |
|10| Implementar na tela de listagem a busca de estoque por palavra chave| Leandro Diniz |

<h3> Backlog de Sprint #2</h3>

* História #2: Como usuário gostaria de me cadastrar no sistema.

| # | Tarefas | Responsáveis |
| --- | ---- | ---- |
|1| Criar as tabelas necessárias para o usuário| Leandro Diniz |
|2| Implementar tela de cadastro de usuário| Kaio Lucas |
|3| Implementar tela de log-in do usuário | Kaio Lucas |
|4| Implementar a lógica do cadastro de usuários| Pedro Cimini |
|5| Implementar  a logica do log-in do usuário e sua sessão | Hélio Martins |

* História #3: Como usuário gostaria de registrar um novo produto no sistema.

| # | Tarefas | Responsáveis |
| --- | ---- | ---- |
|1| Criar as tabelas necessárias para se registrar um novo produto | Leandro Diniz |
|2| Implementar tela de cadastro de produtos | Kaio Lucas |
|3| Implementar a lógica do cadastro de produtos | Pedro Cimini |
|4| Implementar tela de exibição de produtos | Leandro Diniz |
|5| Implementar a lógicade exibição dos produtos | Hélio Martins |

* História #4: Como usuário gostaria de registrar entradas e saídas de um produto no estoque.

| # | Tarefas | Responsáveis |
| --- | ---- | ---- |
|1| Criar as tabelas necessárias para o controle de entrada / saída de estoque | Leandro Diniz |
|2| Implementar tela de entrada de produto | Kaio Lucas |
|3| Implementar a lógica do entrada de produtos | Pedro Cimini |
|4| Implementar tela de movimentação de estoque | Leandro Diniz |
|5| Implementar a lógica de movimentação de estoque | Hélio Martins |

* História #5: Como gerente de estoque gostaria de adicionar e remover estoques.

| # | Tarefas | Responsáveis |
| --- | ---- | ---- |
|1| Criar as tabelas necessárias para o estoque | Leandro Diniz |
|2| Implementar tela de cadastro de estoque | Hélio Martins |
|3| Implementar a lógica de cadastro de estoque | Pedro Cimini | 
|4| Implementar tela de exibição de estoque | Leandro Diniz |
|5| Implementar a lógica de edição de estoque | Kaio Lucas |
|6| Implementar a logica de remoção de estoque | Kaio Lucas |

* História #6: Como gerente de estoque gostaria de definir as permissões de usuários em cada estoque.

| # | Tarefas | Responsáveis |
| --- | ---- | ---- |
|1| Criar as tabelas necessárias para o controle de permissões | Leandro Diniz |
|2| Implementar tela de controle de permissão | Kaio Lucas |
|3| Implementar a lógica de controle de permissão | Pedro Cimini |
|4| Implementar a notificação ao usuário que teve sua permissão modificada | Hélio Martins |


* História #7: Como usuário gostaria de localizar onde um produto se encontra.

| # | Tarefas | Responsáveis |
| --- | ---- | ---- |
|1| Implementar tela de busca de produtos no estoque | Kaio Lucas |
|2| Implementar tela de exibição dos produtos| Kaio Lucas |
|3| Implementar a lógica de busca de produtos no estoque | Pedro Cimini |

* História #8: Como gerente de estoque gostaria de ter um relatório de entradas e saídas de um estoque.

| # | Tarefas | Responsáveis |
| --- | ---- | ---- |
|1| Implementar a tela principal do dashboard| Kaio Lucas |
|2| Implementar tela de solicitação de relatórios | Kaio Lucas |
|3| Implementar a lógica do dashboard | Pedro Cimini |
|4| Implementar a logica da geração de relatórios | Hélio Martins |

<h3> Arquitetura </h3>

Foi solicitado o uso de uma arquitetura hexagonal para o desenvolvimento desse trabalho mas pela falta de experiência de todos integrantes com a linguagem Node e VUE todas tentativas de implementar as portas e adaptadores como nas bibliografias acabou se mostrando ineficaz no nosso trabalho pois nosso código quebrava em pontos que não conseguiamos identificar os motivos.

Com isso utilizamos MVC, que ficou parecido como uma arquitetura hexagonal mas sem as portas de entradas e saidas onde os adaptadores conversam diretamente com as classes de domínio e vice versa. Essa arquitetura foi selecionada pois deixava o código mais proximo de uma arquitetura hexagonal no nosso trabalho além de deixar o mesmo em uma design pattern um pouco mais organizada, mas não garantindo toda segurança e organização como um design hexagonal.

* Todos os repositórios tiveram suas queries escritas usando sqlite3

| # | Adaptadores | Objetivo |
| ---- | ---- | ---- |
|1| depositoRepositorio | Queries relacionadas ao CRUD de depósitos  |
|2| entradaRepositorio | Queries relacionadas a entradas de novos produtos em um deposito |
|3| materialRepositorio | Queries relacionadas ao CRUD de materiais |
|4| saidaRepositorio| Queries relacionadas as saidas de produtos dos depositos |
|5| transferenciaRepositorio| Queries relacionadas a transferências de produtos entre dois depositos |
|6| unidadeRepositorio| Queries relacionadas ao CRUD de unidades |
|7| usuarioRepositorio|  Queries relacionadas ao CRUD de usuários, além de validações de login no DB |

| # | Controllers | Objetivo |
| ---- | ---- | ---- |
|1| depositoController | Regras de negócio relacionadas aos depósitos  |
|2| entradaController | Regras de negócio relacionadas a entradas de novos produtos em um deposito |
|3| materialController | Regras de negócio relacionadas aos materiais |
|4| saidaController|Regras de negócio relacionadas as saidas de produtos dos deposito |
|5| transferenciaController | Regras de negócio relacionadas as transferências de produtos entre dois depositos |
|6| unidadeController | Regras de negócio relacionadas as unidades |
|7| usuarioController |  Regras de negócio relacionadas aos usuários, além de validações de login no sistema |

