import Usuario from "../../entidades/usuario";

describe('Histórias de Usuários', () => {
  let localhost = "https://localhost:8080"
  let usuario = new Usuario("UserE2EAdmin", "UserE2ELogin", "senhadificil", "3")

  Cypress.Commands.add('loginGstock', () => {
    cy.visit(localhost)
    cy.get("#input-login").type(usuario.login)
    cy.get("#input-senha").type(usuario.senha)
    cy.get("#loginButton").click()
  });

  it('História #2: Como usuário gostaria de me cadastrar no sistema.', () => {
    cy.visit(localhost)
    cy.get('#btn-criar-conta').click()
    cy.get("#input-nome").type(usuario.nome)
    cy.get("#input-login").type(usuario.login)
    cy.get("#input-password").type(usuario.senha)
    cy.get('input[name="tipoUsuario"]').check(usuario.tipo)
    cy.get("#loginButton").click()

    cy.get("#input-login").type(usuario.login)
    cy.get("#input-senha").type(usuario.senha)
    cy.get("#loginButton").click()
    cy.get("#btn-welcome").should('have.text', "Bem vindo")
  })

  it('História #1: Como gerente de estoque gostaria de adicionar e remover estoques.', () => {
    cy.loginGstock()

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

  it ("Como usuário gostaria de inserir um novo tipo de unidade", () => {
    cy.loginGstock()

    cy.get("#nav-link-unidade").click()
    cy.get(".btn-primary").click()
    cy.get("#nome").type("Ton")
    cy.get(".btn-success").click()
    cy.get('[data-testid="toast-content"]').should('have.text', 'Unidade salvo com sucesso.');
  })

  it ("História #3: Como usuário gostaria de registrar um novo produto no sistema.", () => {
    cy.loginGstock()

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