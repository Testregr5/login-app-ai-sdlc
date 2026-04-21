/// <reference types="cypress" />

describe('Login', () => {
  it('displays Welcome on valid credentials (admin/1234)', () => {
    cy.visit('index.html')

    cy.get('#username').type('admin')
    cy.get('#password').type('1234')
    cy.get('#loginForm').submit()

    cy.get('#message').should('have.text', 'Welcome')
  })

  it('displays Invalid credentials on wrong credentials', () => {
    cy.visit('index.html')

    cy.get('#username').type('admin')
    cy.get('#password').type('wrong')
    cy.get('#loginForm').submit()

    cy.get('#message').should('have.text', 'Invalid credentials')
  })
})
