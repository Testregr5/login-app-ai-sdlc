/// <reference types="cypress" />

/**
 * Cypress End-to-End Tests for Login Functionality
 * Covers: Valid login, Invalid login (credential check)
 */

describe('Login', () => {
  /**
   * Test: Valid login
   * Coverage: Checks application login with valid credentials (admin/1234).
   * Expects: Shows 'Welcome' message.
   */
  it('displays Welcome on valid credentials (admin/1234)', () => {
    // Input actions
    cy.visit('index.html');
    cy.get('#username').type('admin');
    cy.get('#password').type('1234');
    cy.get('#loginForm').submit();

    // Assertion
    cy.get('#message').should('have.text', 'Welcome');
  });

  /**
   * Test: Invalid login
   * Coverage: Checks application login with invalid credentials.
   * Expects: Shows 'Invalid credentials' message.
   */
  it('displays Invalid credentials on wrong credentials', () => {
    // Input actions
    cy.visit('index.html');
    cy.get('#username').type('admin');
    cy.get('#password').type('wrong');
    cy.get('#loginForm').submit();

    // Assertion
    cy.get('#message').should('have.text', 'Invalid credentials');
  });
});
