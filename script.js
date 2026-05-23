/**
 * Login Application
 * 
 * Security Notice: This application uses client-side credential validation
 * for DEMONSTRATION PURPOSES ONLY. The hardcoded credentials (admin/1234) are
 * visible to anyone who inspects the JavaScript source code.
 * 
 * WARNING: This approach is NOT suitable for production use. Production applications
 * must use server-side authentication with secure credential storage (hashed passwords,
 * secure databases, secure APIs).
 * 
 * Requirements implemented:
 * - FR-001 to FR-010: All functional requirements
 * - NFR-001 to NFR-006: All non-functional requirements
 */

(function () {
  'use strict';

  // ============================================================================
  // CREDENTIAL STORE (FR-001, FR-002)
  // WARNING: Client-side storage is insecure - for demonstration only
  // ============================================================================
  const VALID_USERNAME = 'admin';
  const VALID_PASSWORD = '1234';
  const ERROR_MESSAGE_TEXT = 'Login failed'; // NFR-002: Exact text for all failures

  // ============================================================================
  // VALIDATION MODULE (FR-003, FR-004, FR-005, FR-006, FR-007, NFR-005)
  // ============================================================================

  /**
   * Trims whitespace from input string
   * @param {string} input - Raw input string
   * @returns {string} Trimmed string
   */
  function trimInput(input) {
    if (input === null || input === undefined) {
      return '';
    }
    return String(input).trim();
  }

  /**
   * Validates credentials against hardcoded values
   * @param {string} username - Raw username input
   * @param {string} password - Raw password input
   * @returns {boolean} True if credentials are valid
   */
  function validateCredentials(username, password) {
    // FR-003, FR-004: Trim inputs before validation
    const trimmedUsername = trimInput(username);
    const trimmedPassword = trimInput(password);

    // FR-001, FR-002: Compare with valid credentials
    // NFR-005: Generic validation (doesn't expose which field is wrong)
    return trimmedUsername === VALID_USERNAME && trimmedPassword === VALID_PASSWORD;
  }

  // ============================================================================
  // MESSAGE MANAGER (FR-008, NFR-003, NFR-004)
  // ============================================================================

  /**
   * Displays error message (FR-005, FR-006, FR-007, FR-008)
   * @param {HTMLElement} errorElement - Error message container
   */
  function showErrorMessage(errorElement) {
    if (!errorElement) return;

    // Set error message text (NFR-002)
    errorElement.textContent = ERROR_MESSAGE_TEXT;

    // Show error message (FR-008: positioned below login button)
    errorElement.style.display = 'block';

    // ARIA attributes already set in HTML (NFR-003):
    // - role="alert" for immediate announcement
    // - aria-live="polite" for screen reader compatibility
  }

  /**
   * Clears error message (FR-010)
   * @param {HTMLElement} errorElement - Error message container
   */
  function clearErrorMessage(errorElement) {
    if (!errorElement) return;

    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }

  // ============================================================================
  // VIEW MANAGER
  // ============================================================================

  /**
   * Shows login view, hides authenticated view
   */
  function showLoginView(loginView, authenticatedView) {
    if (loginView) loginView.style.display = 'block';
    if (authenticatedView) authenticatedView.style.display = 'none';
  }

  /**
   * Shows authenticated view, hides login view (FR-009)
   */
  function showAuthenticatedView(loginView, authenticatedView) {
    if (loginView) loginView.style.display = 'none';
    if (authenticatedView) authenticatedView.style.display = 'block';
  }

  // ============================================================================
  // APPLICATION CONTROLLER
  // ============================================================================

  /**
   * Initialize application after DOM is ready
   */
  function init() {
    // Cache DOM elements
    const loginView = document.getElementById('login-view');
    const authenticatedView = document.getElementById('authenticated-view');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessageElement = document.getElementById('error-message');
    const logoutButton = document.getElementById('logout-button');

    // Initial state: show login view
    showLoginView(loginView, authenticatedView);
    clearErrorMessage(errorMessageElement);

    // ========================================================================
    // LOGIN FORM SUBMISSION HANDLER
    // ========================================================================
    if (loginForm) {
      loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get raw input values
        const username = usernameInput ? usernameInput.value : '';
        const password = passwordInput ? passwordInput.value : '';

        // Validate credentials (with trimming)
        // NFR-001: Validation is synchronous and fast (<100ms)
        if (validateCredentials(username, password)) {
          // FR-009: Successful login
          clearErrorMessage(errorMessageElement);
          showAuthenticatedView(loginView, authenticatedView);
        } else {
          // FR-005, FR-006, FR-007: Show "Login failed" for any invalid credentials
          showErrorMessage(errorMessageElement);
        }
      });
    }

    // ========================================================================
    // ERROR CLEARING ON INPUT CHANGE (FR-010)
    // ========================================================================
    if (usernameInput) {
      usernameInput.addEventListener('input', function () {
        // FR-010: Clear error when user modifies username field
        clearErrorMessage(errorMessageElement);
      });
    }

    if (passwordInput) {
      passwordInput.addEventListener('input', function () {
        // FR-010: Clear error when user modifies password field
        clearErrorMessage(errorMessageElement);
      });
    }

    // ========================================================================
    // LOGOUT HANDLER
    // ========================================================================
    if (logoutButton) {
      logoutButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Clear input fields for security
        if (usernameInput) usernameInput.value = '';
        if (passwordInput) passwordInput.value = '';

        // Clear any error messages
        clearErrorMessage(errorMessageElement);

        // Return to login view
        showLoginView(loginView, authenticatedView);
      });
    }
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', init);

  // Export for testing (if needed)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      trimInput,
      validateCredentials
    };
  }
})();