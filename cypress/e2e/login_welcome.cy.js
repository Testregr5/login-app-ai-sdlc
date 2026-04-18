/// <reference types="cypress" />

describe('Login', () => {
  it('displays "Welcome" on valid credentials', () => {
    cy.visit('index.html')

    cy.get('#username').type('admin')
    cy.get('#password').type('1234')

    cy.get('#loginForm').submit()

    cy.get('#message').should('have.text', 'Welcome')
  })
})
