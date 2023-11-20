import Usuario from "../../entidades/usuario";

describe('Histórias de Usuários', () => {
  let localhost = "https://localhost:8080"
  let usuario = new Usuario("UserE2EAdmin", "UserE2ELogin", "senhadificil", "3")

  Cypress.Commands.add('loginGstock', (user) => {
    cy.visit(localhost)
    cy.get("#input-login").type(user.login)
    cy.get("#input-senha").type(user.senha)
    cy.get("#loginButton").click()
  });

  describe("História 2", () => {
    it('Como usuário gostaria de me cadastrar no sistema.', () => {
      cy.visit(localhost)
      cy.get('#btn-criar-conta').click()
      cy.get("#input-nome").type(usuario.nome)
      cy.get("#input-login").type(usuario.login)
      cy.get("#input-password").type(usuario.senha)
      cy.get('input[name="tipoUsuario"]').check(usuario.tipo)
      cy.get("#loginButton").click()
  
      cy.wait(1000);
      cy.get("#input-login").type(usuario.login)
      cy.get("#input-senha").type(usuario.senha)
      cy.get("#loginButton").click()
      cy.get("#btn-welcome").should('have.text', "Bem vindo")
    })
  })


  describe("História 1", () => {
    it('Como admin de estoque gostaria de adicionar estoques.', () => {
      cy.loginGstock(usuario)
  
      cy.get("#nav-link-deposito").click()
      cy.get("#btn-add-deposito").click()
      cy.get("#nome").type("DepositoTeste1")
      cy.get(".btn-success").click()
      cy.get('[data-testid="toast-content"]').should('have.text', 'Depósito salvo com sucesso.');
  
      cy.get("#nav-link-deposito").click()
      cy.get("#btn-add-deposito").click()
      cy.get("#nome").type("DepositoTeste2")
      cy.get(".btn-success").click()
      cy.get('[data-testid="toast-content"]').should('have.text', 'Depósito salvo com sucesso.');
  
      cy.get("#nav-link-deposito").click()
      cy.get("#btn-add-deposito").click()
      cy.get("#nome").type("DepositoTeste3")
      cy.get(".btn-success").click()
      cy.get('[data-testid="toast-content"]').should('have.text', 'Depósito salvo com sucesso.');
  
      cy.get("#nav-link-deposito").click()
      cy.get("#btn-add-deposito").click()
      cy.get("#nome").type("DepositoTesteRemover")
      cy.get(".btn-success").click()
      cy.get('[data-testid="toast-content"]').should('have.text', 'Depósito salvo com sucesso.');
    })

    it('Como admin de estoque gostaria de remover estoques.', () => {
      cy.loginGstock(usuario)
      cy.get("#nav-link-deposito").click()
      cy.get('.table tbody').find('tr').eq(3).as('depositoRemover');
  
      cy.get('@depositoRemover').find('#btn-excluir').click();
      cy.get('.popup-modal').find('.btns').find('.secondaryColorBtn').click()
      // cy.get('[data-testid="toast-content"]').should('include', 'Depósito excluído com sucesso.');
    })
  })


  describe("História 3", () => {
    it ("Como usuário gostaria de inserir um novo tipo de unidade", () => {
      cy.loginGstock(usuario)
  
      cy.get("#nav-link-unidade").click()
      cy.get(".btn-primary").click()
      cy.get("#nome").type("Ton")
      cy.get(".btn-success").click()
      cy.get('[data-testid="toast-content"]').should('have.text', 'Unidade salvo com sucesso.');
    })
  
    it ("Como usuário gostaria de registrar um novo produto no sistema.", () => {
      cy.loginGstock(usuario)
  
      cy.get("#nav-link-material").click()
      cy.get("#btn-add-material").click()
      cy.get("#nome").type("Produto1")
      cy.get('#unidade-material').select('Ton');
      cy.get("#preco").type("10")
      cy.get(".btn-success").click()
      cy.get('[data-testid="toast-content"]').should('have.text', 'Material salvo com sucesso.');
  
      cy.get("#nav-link-material").click()
      cy.get("#btn-add-material").click()
      cy.get("#nome").type("Produto2")
      cy.get('#unidade-material').select('Ton');
      cy.get("#preco").type("15")
      cy.get(".btn-success").click()
      cy.get('[data-testid="toast-content"]').should('have.text', 'Material salvo com sucesso.');
  
      cy.get("#nav-link-material").click()
      cy.get("#btn-add-material").click()
      cy.get("#nome").type("Produto3")
      cy.get('#unidade-material').select('Ton');
      cy.get("#preco").type("20")
      cy.get(".btn-success").click()
      cy.get('[data-testid="toast-content"]').should('have.text', 'Material salvo com sucesso.');
    })
  })


  describe("História 4", () => {
    it ("Como usuário gostaria de registrar entradas de um produto no estoque.", () => {
      cy.loginGstock(usuario)
  
      cy.get("#nav-link-entrada").click()
      cy.get("#btn-entrada-material").click()
      cy.get("#nome").type("2000-10-10")
      cy.get("#select-deposito").select('DepositoTeste1')
      cy.get("#select-material").select('Produto1')
      cy.get("#quantidade").type("300");
      cy.get("#btn-salvar-entrada").click();
  
      cy.get('.table tbody tr').first().as('primeiraLinha');
  
      cy.get('@primeiraLinha').find('td').eq(2).invoke('text').as('deposito');
      cy.get('@deposito').should('include', 'DepositoTeste1');
  
      cy.get('@primeiraLinha').find('td').eq(3).invoke('text').as('produto');
      cy.get('@produto').should('include', 'Produto1');
  
      cy.get('@primeiraLinha').find('td').eq(4).invoke('text').as('quantidade');
      cy.get('@quantidade').should('include', '300');
    })
  
    it ("Como usuário gostaria de registrar saídas de um produto no estoque.", () => {
      cy.loginGstock(usuario)
  
      cy.get("#nav-link-saida").click()
      cy.get("#btn-saida-material").click()
      cy.get("#nome").type("2000-10-10")
      cy.get("#select-deposito").select('DepositoTeste1')
      cy.get("#select-material").select('Produto1')
      cy.get("#quantidade").type("100");
      cy.get("#btn-salvar-saida").click();
  
      cy.get('.table tbody tr').first().as('primeiraLinha');
  
      cy.get('@primeiraLinha').find('td').eq(2).invoke('text').as('deposito');
      cy.get('@deposito').should('include', 'DepositoTeste1');
  
      cy.get('@primeiraLinha').find('td').eq(3).invoke('text').as('produto');
      cy.get('@produto').should('include', 'Produto1');
  
      cy.get('@primeiraLinha').find('td').eq(4).invoke('text').as('quantidade');
      cy.get('@quantidade').should('include', '100');
    })
  })

  describe("História 5", () => {
    var gerente = new Usuario("Gerente", "Gerente", "senhadificil", "2");
    it('Como gerente gostaria de me cadastrar no sistema.', () => {
      cy.visit(localhost)
      cy.get('#btn-criar-conta').click()
      cy.get("#input-nome").type(gerente.nome)
      cy.get("#input-login").type(gerente.login)
      cy.get("#input-password").type(gerente.senha)
      cy.get('input[name="tipoUsuario"]').check(gerente.tipo)
      cy.get("#loginButton").click()
  
      cy.wait(1000);
      cy.get("#input-login").type(gerente.login)
      cy.get("#input-senha").type(gerente.senha)
      cy.get("#loginButton").click()
      cy.get("#btn-welcome").should('have.text', "Bem vindo")
    })

    it('Como gerente de estoque gostaria de adicionar estoques.', () => {
      cy.loginGstock(gerente)
  
      cy.get("#nav-link-deposito").click()
      cy.get("#btn-add-deposito").click()
      cy.get("#nome").type("DepositoGerente1")
      cy.get(".btn-success").click()
      cy.get('[data-testid="toast-content"]').should('have.text', 'Depósito salvo com sucesso.');
  
      cy.get("#nav-link-deposito").click()
      cy.get("#btn-add-deposito").click()
      cy.get("#nome").type("DepositoGerente2")
      cy.get(".btn-success").click()
      cy.get('[data-testid="toast-content"]').should('have.text', 'Depósito salvo com sucesso.');
  
      cy.get("#nav-link-deposito").click()
      cy.get("#btn-add-deposito").click()
      cy.get("#nome").type("DepositoGerente3")
      cy.get(".btn-success").click()
      cy.get('[data-testid="toast-content"]').should('have.text', 'Depósito salvo com sucesso.');
  
      cy.get("#nav-link-deposito").click()
      cy.get("#btn-add-deposito").click()
      cy.get("#nome").type("DepositoGerenteRemover")
      cy.get(".btn-success").click()
      cy.get('[data-testid="toast-content"]').should('have.text', 'Depósito salvo com sucesso.');
    })

    it('Como admin de estoque gostaria de remover estoques.', () => {
      cy.loginGstock(gerente)
      cy.get("#nav-link-deposito").click()
      cy.get('.table tbody').find('tr').eq(3).as('depositoRemover');
  
      cy.get('@depositoRemover').find('#btn-excluir').click();
      cy.get('.popup-modal').find('.btns').find('.secondaryColorBtn').click()
      // cy.get('[data-testid="toast-content"]').should('include', 'Depósito excluído com sucesso.');
    })
  })

  describe("História 6", () => {
    var gerente = new Usuario("Gerente", "Gerente", "senhadificil", "2");
    var comun = new Usuario("Comun", "Comun", "senhadificil", "1");

    it('Cadastro de Usuario Comun', () => {
      cy.visit(localhost)
      cy.get('#btn-criar-conta').click()
      cy.get("#input-nome").type(comun.nome)
      cy.get("#input-login").type(comun.login)
      cy.get("#input-password").type(comun.senha)
      cy.get('input[name="tipoUsuario"]').check(comun.tipo)
      cy.get("#loginButton").click()
  
      cy.wait(1000);
      cy.get("#input-login").type(comun.login)
      cy.get("#input-senha").type(comun.senha)
      cy.get("#loginButton").click()
      cy.get("#btn-welcome").should('have.text', "Bem vindo")
    })

    it('Como gerente de estoque gostaria de definir as permissões de usuários em cada estoque.', () => {
      cy.loginGstock(gerente)
  
      cy.get("#nav-link-deposito").click()
      cy.get("#nav-link-deposito").click()
      cy.get('.table tbody').find('tr').eq(1).as('depositoPermissao');
  
      cy.get('@depositoPermissao').find('#btn-permissao').click();
      cy.get('.table tbody').find('tr').eq(2).as('depositoPermissao');
      cy.get('@depositoPermissao').find("#btn-editar").click()
      
      cy.get('#select-permissao').select("Editar")
      cy.get('.primaryColorBtn').click()

      cy.get('@depositoPermissao').find("td").eq(2).should('have.text', 'Editar')
    })
  })

  describe("História 7", () => {
    it ("Como usuário gostaria de localizar onde um produto se encontra.", () => {
      cy.loginGstock(usuario)
  
      cy.get("#nav-link-deposito").click()
      cy.get("#nav-link-deposito").click()

      cy.get('.table tbody tr').first().find('td').eq(0).find('.btn-exibir-estoque').click();
      cy.get('.table tbody tr').first().as("primeiraLinha")

      cy.get('@primeiraLinha').find('td').eq(1).invoke('text').as('produto');
      cy.get('@produto').should('include', 'Produto1');

      cy.get('@primeiraLinha').find('td').eq(2).invoke('text').as('quantidade');
      cy.get('@quantidade').should('include', '200');
    })
  })

  describe("História 8", () => {
    it ("Como gerente de estoque gostaria de ter um relatório de entradas e saídas de um estoque.", () => {
      cy.loginGstock(usuario)
  
      cy.get('#select-deposito').select('DepositoTeste1');
      cy.get('#select-material').select('Produto1');
    })
  })

})