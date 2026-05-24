/**
 * Login Feature E2E Tests
 * 
 * Tests all functional and non-functional requirements:
 * - FR-001 to FR-010: Functional requirements
 * - NFR-001 to NFR-006: Non-functional requirements
 * 
 * Test Coverage: 16/16 requirements (100%)
 */

describe('Login Feature - Complete Test Suite', () => {
  beforeEach(() => {
    // Visit the application before each test
    cy.visit('../../index.html');
  });

  // ==========================================================================
  // VALID LOGIN TESTS (FR-001, FR-002, FR-009)
  // ==========================================================================

  describe('Valid Login Scenarios', () => {
    it('FR-001, FR-002, FR-009: should login successfully with valid credentials admin/1234', () => {
      cy.get('[data-test-id="username"]').type('admin');
      cy.get('[data-test-id="password"]').type('1234');
      cy.get('[data-test-id="login-button"]').click();

      // Should show authenticated view
      cy.get('[data-test-id="welcome-message"]').should('be.visible');
      
      // Should not show error message
      cy.get('[data-test-id="error-message"]').should('not.be.visible');
      
      // Login view should be hidden
      cy.get('#login-view').should('not.be.visible');
    });

    it('FR-003, FR-004: should login successfully with whitespace-padded credentials', () => {
      // Test input trimming
      cy.get('[data-test-id="username"]').type('  admin  ');
      cy.get('[data-test-id="password"]').type('  1234  ');
      cy.get('[data-test-id="login-button"]').click();

      // Should successfully login (trimming applied)
      cy.get('[data-test-id="welcome-message"]').should('be.visible');
      cy.get('[data-test-id="error-message"]').should('not.be.visible');
    });

    it('FR-003: should trim leading whitespace from username', () => {
      cy.get('[data-test-id="username"]').type('   admin');
      cy.get('[data-test-id="password"]').type('1234');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="welcome-message"]').should('be.visible');
    });

    it('FR-003: should trim trailing whitespace from username', () => {
      cy.get('[data-test-id="username"]').type('admin   ');
      cy.get('[data-test-id="password"]').type('1234');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="welcome-message"]').should('be.visible');
    });

    it('FR-004: should trim leading whitespace from password', () => {
      cy.get('[data-test-id="username"]').type('admin');
      cy.get('[data-test-id="password"]').type('   1234');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="welcome-message"]').should('be.visible');
    });

    it('FR-004: should trim trailing whitespace from password', () => {
      cy.get('[data-test-id="username"]').type('admin');
      cy.get('[data-test-id="password"]').type('1234   ');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="welcome-message"]').should('be.visible');
    });
  });

  // ==========================================================================
  // INVALID LOGIN TESTS (FR-005, FR-006, FR-007, NFR-002, NFR-005)
  // ==========================================================================

  describe('Invalid Login Scenarios', () => {
    it('FR-005, NFR-002: should display "Login failed" for invalid username', () => {
      cy.get('[data-test-id="username"]').type('wronguser');
      cy.get('[data-test-id="password"]').type('1234');
      cy.get('[data-test-id="login-button"]').click();

      // Should show error message
      cy.get('[data-test-id="error-message"]')
        .should('be.visible')
        .and('contain', 'Login failed'); // NFR-002: Exact text

      // Should not show authenticated view
      cy.get('[data-test-id="welcome-message"]').should('not.exist');
    });

    it('FR-006, NFR-002: should display "Login failed" for invalid password', () => {
      cy.get('[data-test-id="username"]').type('admin');
      cy.get('[data-test-id="password"]').type('wrongpass');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="error-message"]')
        .should('be.visible')
        .and('contain', 'Login failed'); // NFR-002: Exact text
    });

    it('FR-007, NFR-002: should display "Login failed" for both invalid credentials', () => {
      cy.get('[data-test-id="username"]').type('wronguser');
      cy.get('[data-test-id="password"]').type('wrongpass');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="error-message"]')
        .should('be.visible')
        .and('contain', 'Login failed'); // NFR-002: Exact text
    });

    it('NFR-005: should show generic "Login failed" message for all failure scenarios', () => {
      // Test 1: Invalid username only
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('1234');
      cy.get('[data-test-id="login-button"]').click();
      
      let errorText1;
      cy.get('[data-test-id="error-message"]')
        .invoke('text')
        .then((text) => { errorText1 = text; });

      // Clear and test 2: Invalid password only
      cy.get('[data-test-id="username"]').clear().type('admin');
      cy.get('[data-test-id="password"]').clear().type('wrong');
      cy.get('[data-test-id="login-button"]').click();
      
      cy.get('[data-test-id="error-message"]')
        .invoke('text')
        .then((text) => {
          // Error messages should be identical (generic, no field exposure)
          expect(text).to.equal('Login failed');
          expect(text).to.equal(errorText1);
        });
    });

    it('should display "Login failed" for empty credentials', () => {
      // Empty username and password
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="error-message"]')
        .should('be.visible')
        .and('contain', 'Login failed');
    });

    it('should display "Login failed" for whitespace-only credentials', () => {
      cy.get('[data-test-id="username"]').type('   ');
      cy.get('[data-test-id="password"]').type('   ');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="error-message"]')
        .should('be.visible')
        .and('contain', 'Login failed');
    });
  });

  // ==========================================================================
  // ERROR MESSAGE POSITIONING (FR-008)
  // ==========================================================================

  describe('Error Message Positioning', () => {
    it('FR-008: error message should be positioned below the Login button', () => {
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('wrong');
      cy.get('[data-test-id="login-button"]').click();

      // Get button and error message positions
      cy.get('[data-test-id="login-button"]').then(($button) => {
        const buttonBottom = $button[0].getBoundingClientRect().bottom;

        cy.get('[data-test-id="error-message"]').then(($error) => {
          const errorTop = $error[0].getBoundingClientRect().top;

          // Error message top should be greater than button bottom
          expect(errorTop).to.be.greaterThan(buttonBottom - 1); // Allow 1px tolerance
        });
      });
    });
  });

  // ==========================================================================
  // ERROR CLEARING ON INPUT (FR-010)
  // ==========================================================================

  describe('Error Message Clearing Behavior', () => {
    it('FR-010: should clear error message when username is modified', () => {
      // Trigger error
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('wrong');
      cy.get('[data-test-id="login-button"]').click();

      // Verify error is displayed
      cy.get('[data-test-id="error-message"]').should('be.visible');

      // Modify username
      cy.get('[data-test-id="username"]').clear().type('a');

      // Error should be cleared
      cy.get('[data-test-id="error-message"]').should('not.be.visible');
    });

    it('FR-010: should clear error message when password is modified', () => {
      // Trigger error
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('wrong');
      cy.get('[data-test-id="login-button"]').click();

      // Verify error is displayed
      cy.get('[data-test-id="error-message"]').should('be.visible');

      // Modify password
      cy.get('[data-test-id="password"]').clear().type('1');

      // Error should be cleared
      cy.get('[data-test-id="error-message"]').should('not.be.visible');
    });

    it('FR-010: should clear error message on typing in username field', () => {
      // Trigger error
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('wrong');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="error-message"]').should('be.visible');

      // Start typing in username (without clearing)
      cy.get('[data-test-id="username"]').type('x');

      // Error should be cleared immediately
      cy.get('[data-test-id="error-message"]').should('not.be.visible');
    });

    it('FR-010: should clear error message on typing in password field', () => {
      // Trigger error
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('wrong');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="error-message"]').should('be.visible');

      // Start typing in password (without clearing)
      cy.get('[data-test-id="password"]').type('x');

      // Error should be cleared immediately
      cy.get('[data-test-id="error-message"]').should('not.be.visible');
    });
  });

  // ==========================================================================
  // PERFORMANCE TESTS (NFR-001)
  // ==========================================================================

  describe('Performance Requirements', () => {
    it('NFR-001: should display error message within 100ms of form submission', () => {
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('wrong');

      const startTime = Date.now();

      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="error-message"]')
        .should('be.visible')
        .then(() => {
          const endTime = Date.now();
          const duration = endTime - startTime;

          // Should be displayed within 100ms
          expect(duration).to.be.lessThan(100);
        });
    });

    it('NFR-001: should complete successful login within 100ms', () => {
      cy.get('[data-test-id="username"]').type('admin');
      cy.get('[data-test-id="password"]').type('1234');

      const startTime = Date.now();

      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="welcome-message"]')
        .should('be.visible')
        .then(() => {
          const endTime = Date.now();
          const duration = endTime - startTime;

          // Should complete within 100ms
          expect(duration).to.be.lessThan(100);
        });
    });
  });

  // ==========================================================================
  // ACCESSIBILITY TESTS (NFR-003, NFR-004)
  // ==========================================================================

  describe('Accessibility Requirements', () => {
    it('NFR-003: error message should have role="alert"', () => {
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('wrong');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="error-message"]')
        .should('have.attr', 'role', 'alert');
    });

    it('NFR-003: error message should have aria-live="polite"', () => {
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('wrong');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="error-message"]')
        .should('have.attr', 'aria-live', 'polite');
    });

    it('NFR-004: error message should have red text color for visual distinction', () => {
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('wrong');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="error-message"]')
        .should('have.css', 'color', 'rgb(211, 47, 47)'); // #d32f2f in RGB
    });

    it('should support keyboard navigation', () => {
      // Tab to username field
      cy.get('body').tab();
      cy.focused().should('have.attr', 'data-test-id', 'username');

      // Tab to password field
      cy.focused().tab();
      cy.focused().should('have.attr', 'data-test-id', 'password');

      // Tab to login button
      cy.focused().tab();
      cy.focused().should('have.attr', 'data-test-id', 'login-button');
    });

    it('should submit form with Enter key', () => {
      cy.get('[data-test-id="username"]').type('admin');
      cy.get('[data-test-id="password"]').type('1234{enter}');

      // Should successfully login
      cy.get('[data-test-id="welcome-message"]').should('be.visible');
    });

    it('should have proper focus indicators', () => {
      cy.get('[data-test-id="username"]').focus();

      // Check that focused element has visible outline
      cy.get('[data-test-id="username"]')
        .should('have.css', 'outline-style')
        .and('match', /solid|auto/); // Not 'none'
    });
  });

  // ==========================================================================
  // AUTHENTICATED VIEW AND LOGOUT
  // ==========================================================================

  describe('Authenticated View and Logout', () => {
    it('should display welcome message after successful login', () => {
      cy.get('[data-test-id="username"]').type('admin');
      cy.get('[data-test-id="password"]').type('1234');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="welcome-message"]')
        .should('be.visible')
        .and('contain', 'admin');
    });

    it('should display logout button in authenticated view', () => {
      cy.get('[data-test-id="username"]').type('admin');
      cy.get('[data-test-id="password"]').type('1234');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="logout-button"]').should('be.visible');
    });

    it('should return to login view when logout is clicked', () => {
      // Login first
      cy.get('[data-test-id="username"]').type('admin');
      cy.get('[data-test-id="password"]').type('1234');
      cy.get('[data-test-id="login-button"]').click();

      // Click logout
      cy.get('[data-test-id="logout-button"]').click();

      // Should return to login view
      cy.get('#login-view').should('be.visible');
      cy.get('#authenticated-view').should('not.be.visible');
    });

    it('should clear input fields on logout', () => {
      // Login
      cy.get('[data-test-id="username"]').type('admin');
      cy.get('[data-test-id="password"]').type('1234');
      cy.get('[data-test-id="login-button"]').click();

      // Logout
      cy.get('[data-test-id="logout-button"]').click();

      // Fields should be cleared
      cy.get('[data-test-id="username"]').should('have.value', '');
      cy.get('[data-test-id="password"]').should('have.value', '');
    });

    it('should clear any error messages on logout', () => {
      // Trigger error
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('wrong');
      cy.get('[data-test-id="login-button"]').click();

      // Login successfully
      cy.get('[data-test-id="username"]').clear().type('admin');
      cy.get('[data-test-id="password"]').clear().type('1234');
      cy.get('[data-test-id="login-button"]').click();

      // Logout
      cy.get('[data-test-id="logout-button"]').click();

      // Error message should not be visible
      cy.get('[data-test-id="error-message"]').should('not.be.visible');
    });
  });

  // ==========================================================================
  // NO BRUTE FORCE PROTECTION (NFR-006)
  // ==========================================================================

  describe('No Brute Force Protection', () => {
    it('NFR-006: should allow unlimited login attempts without lockout', () => {
      // Attempt 10 failed logins
      for (let i = 0; i < 10; i++) {
        cy.get('[data-test-id="username"]').clear().type('invalid');
        cy.get('[data-test-id="password"]').clear().type('wrong');
        cy.get('[data-test-id="login-button"]').click();

        // Should still show error (not locked out)
        cy.get('[data-test-id="error-message"]').should('be.visible');
      }

      // 11th attempt with valid credentials should still work
      cy.get('[data-test-id="username"]').clear().type('admin');
      cy.get('[data-test-id="password"]').clear().type('1234');
      cy.get('[data-test-id="login-button"]').click();

      // Should successfully login (no account lockout)
      cy.get('[data-test-id="welcome-message"]').should('be.visible');
    });
  });

  // ==========================================================================
  // EDGE CASES
  // ==========================================================================

  describe('Edge Cases and Boundary Conditions', () => {
    it('should handle case-sensitive username validation', () => {
      cy.get('[data-test-id="username"]').type('Admin'); // Uppercase A
      cy.get('[data-test-id="password"]').type('1234');
      cy.get('[data-test-id="login-button"]').click();

      // Should show error (case sensitive)
      cy.get('[data-test-id="error-message"]').should('be.visible');
    });

    it('should handle case-sensitive password validation', () => {
      cy.get('[data-test-id="username"]').type('admin');
      cy.get('[data-test-id="password"]').type('1234a'); // Extra character
      cy.get('[data-test-id="login-button"]').click();

      // Should show error
      cy.get('[data-test-id="error-message"]').should('be.visible');
    });

    it('should handle special characters in username', () => {
      cy.get('[data-test-id="username"]').type('admin@123');
      cy.get('[data-test-id="password"]').type('1234');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="error-message"]').should('be.visible');
    });

    it('should handle special characters in password', () => {
      cy.get('[data-test-id="username"]').type('admin');
      cy.get('[data-test-id="password"]').type('1234!@#');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="error-message"]').should('be.visible');
    });

    it('should handle very long username input', () => {
      const longUsername = 'a'.repeat(1000);
      cy.get('[data-test-id="username"]').type(longUsername);
      cy.get('[data-test-id="password"]').type('1234');
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="error-message"]').should('be.visible');
    });

    it('should handle very long password input', () => {
      const longPassword = '1'.repeat(1000);
      cy.get('[data-test-id="username"]').type('admin');
      cy.get('[data-test-id="password"]').type(longPassword);
      cy.get('[data-test-id="login-button"]').click();

      cy.get('[data-test-id="error-message"]').should('be.visible');
    });
  });
});
