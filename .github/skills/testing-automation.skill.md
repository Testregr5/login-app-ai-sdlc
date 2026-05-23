---
name: testing-automation
description: Skill for comprehensive testing including unit tests, integration tests, e2e tests, accessibility testing, and performance testing
---

# Testing Automation Skill

This skill provides comprehensive testing capabilities for all stages of software development.

## Capabilities

1. **Unit Testing**
   - Test individual functions and modules
   - Mock dependencies
   - Test edge cases and error conditions

2. **Integration Testing**
   - Test component interactions
   - Test data flow between modules
   - Test API integrations

3. **End-to-End Testing (E2E)**
   - Test complete user workflows
   - Test across multiple pages/views
   - Test real user scenarios

4. **Accessibility Testing**
   - WCAG compliance testing
   - Keyboard navigation testing
   - Screen reader compatibility

5. **Performance Testing**
   - Load time measurement
   - Response time validation
   - Resource usage monitoring

6. **Visual Regression Testing**
   - Screenshot comparison
   - UI consistency validation

---

## Testing Frameworks

### For JavaScript/Node.js Projects

- **Jest** - Unit and integration testing
- **Cypress** - E2E testing
- **Playwright** - E2E and cross-browser testing
- **cypress-axe** - Accessibility testing
- **Lighthouse** - Performance testing

---

## Unit Testing with Jest

### Setup

```bash
# Install Jest
npm install --save-dev jest

# Add to package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Writing Unit Tests

```javascript
// validation.test.js
describe('Login Validation', () => {
  describe('trimInput', () => {
    it('should remove leading whitespace', () => {
      const result = trimInput('  admin');
      expect(result).toBe('admin');
    });

    it('should remove trailing whitespace', () => {
      const result = trimInput('admin  ');
      expect(result).toBe('admin');
    });

    it('should remove both leading and trailing whitespace', () => {
      const result = trimInput('  admin  ');
      expect(result).toBe('admin');
    });

    it('should handle empty string', () => {
      const result = trimInput('');
      expect(result).toBe('');
    });

    it('should handle null or undefined', () => {
      expect(trimInput(null)).toBe('');
      expect(trimInput(undefined)).toBe('');
    });
  });

  describe('validateCredentials', () => {
    it('should return true for valid credentials', () => {
      const result = validateCredentials('admin', '1234');
      expect(result).toBe(true);
    });

    it('should return false for invalid username', () => {
      const result = validateCredentials('user', '1234');
      expect(result).toBe(false);
    });

    it('should return false for invalid password', () => {
      const result = validateCredentials('admin', 'wrong');
      expect(result).toBe(false);
    });

    it('should return false for both invalid', () => {
      const result = validateCredentials('user', 'wrong');
      expect(result).toBe(false);
    });

    it('should trim inputs before validation', () => {
      const result = validateCredentials('  admin  ', '  1234  ');
      expect(result).toBe(true);
    });
  });
});
```

### Run Unit Tests

```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test file
npm test validation.test.js
```

---

## E2E Testing with Cypress

### Setup

```bash
# Install Cypress
npm install --save-dev cypress

# Open Cypress
npx cypress open

# Add to package.json
{
  "scripts": {
    "test:e2e": "cypress run",
    "test:e2e:open": "cypress open"
  }
}
```

### Writing E2E Tests

```javascript
// cypress/e2e/login.cy.js
describe('Login Feature', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Valid Login', () => {
    it('should login successfully with valid credentials', () => {
      cy.get('[data-test-id="username"]').type('admin');
      cy.get('[data-test-id="password"]').type('1234');
      cy.get('[data-test-id="login-button"]').click();
      
      // Assert success state
      cy.get('[data-test-id="error-message"]').should('not.exist');
      cy.get('[data-test-id="welcome-message"]').should('be.visible');
    });

    it('should trim whitespace from inputs', () => {
      cy.get('[data-test-id="username"]').type('  admin  ');
      cy.get('[data-test-id="password"]').type('  1234  ');
      cy.get('[data-test-id="login-button"]').click();
      
      cy.get('[data-test-id="error-message"]').should('not.exist');
      cy.get('[data-test-id="welcome-message"]').should('be.visible');
    });
  });

  describe('Invalid Login', () => {
    it('should display error for invalid username', () => {
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('1234');
      cy.get('[data-test-id="login-button"]').click();
      
      cy.get('[data-test-id="error-message"]')
        .should('be.visible')
        .and('contain', 'Login failed');
    });

    it('should display error for invalid password', () => {
      cy.get('[data-test-id="username"]').type('admin');
      cy.get('[data-test-id="password"]').type('wrong');
      cy.get('[data-test-id="login-button"]').click();
      
      cy.get('[data-test-id="error-message"]')
        .should('be.visible')
        .and('contain', 'Login failed');
    });

    it('should display error for both invalid', () => {
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('wrong');
      cy.get('[data-test-id="login-button"]').click();
      
      cy.get('[data-test-id="error-message"]')
        .should('be.visible')
        .and('contain', 'Login failed');
    });

    it('should display error below login button', () => {
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('wrong');
      cy.get('[data-test-id="login-button"]').click();
      
      // Check error message position
      cy.get('[data-test-id="login-button"]')
        .then($button => {
          const buttonBottom = $button[0].getBoundingClientRect().bottom;
          
          cy.get('[data-test-id="error-message"]')
            .then($error => {
              const errorTop = $error[0].getBoundingClientRect().top;
              expect(errorTop).to.be.greaterThan(buttonBottom);
            });
        });
    });
  });

  describe('Error Message Behavior', () => {
    it('should clear error when username is modified', () => {
      // Trigger error
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('wrong');
      cy.get('[data-test-id="login-button"]').click();
      cy.get('[data-test-id="error-message"]').should('be.visible');
      
      // Modify username
      cy.get('[data-test-id="username"]').clear().type('a');
      
      // Error should disappear
      cy.get('[data-test-id="error-message"]').should('not.exist');
    });

    it('should clear error when password is modified', () => {
      // Trigger error
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('wrong');
      cy.get('[data-test-id="login-button"]').click();
      cy.get('[data-test-id="error-message"]').should('be.visible');
      
      // Modify password
      cy.get('[data-test-id="password"]').clear().type('1');
      
      // Error should disappear
      cy.get('[data-test-id="error-message"]').should('not.exist');
    });
  });

  describe('Performance', () => {
    it('should display error within 100ms', () => {
      const startTime = Date.now();
      
      cy.get('[data-test-id="username"]').type('invalid');
      cy.get('[data-test-id="password"]').type('wrong');
      cy.get('[data-test-id="login-button"]').click();
      
      cy.get('[data-test-id="error-message"]')
        .should('be.visible')
        .then(() => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          expect(duration).to.be.lessThan(100);
        });
    });
  });
});
```

### Run E2E Tests

```bash
# Run in headless mode
npm run test:e2e

# Run in interactive mode
npm run test:e2e:open

# Run specific test file
npx cypress run --spec "cypress/e2e/login.cy.js"

# Run in specific browser
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

---

## Accessibility Testing with cypress-axe

### Setup

```bash
# Install cypress-axe
npm install --save-dev cypress-axe axe-core

# Add to cypress/support/e2e.js
import 'cypress-axe';
```

### Writing Accessibility Tests

```javascript
// cypress/e2e/accessibility.cy.js
describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('should have no accessibility violations on page load', () => {
    cy.checkA11y();
  });

  it('should have proper ARIA attributes on error message', () => {
    cy.get('[data-test-id="username"]').type('invalid');
    cy.get('[data-test-id="password"]').type('wrong');
    cy.get('[data-test-id="login-button"]').click();
    
    cy.get('[data-test-id="error-message"]')
      .should('have.attr', 'role', 'alert')
      .and('have.attr', 'aria-live', 'polite');
  });

  it('should be keyboard navigable', () => {
    // Tab to username
    cy.get('body').tab();
    cy.focused().should('have.attr', 'data-test-id', 'username');
    
    // Tab to password
    cy.focused().tab();
    cy.focused().should('have.attr', 'data-test-id', 'password');
    
    // Tab to login button
    cy.focused().tab();
    cy.focused().should('have.attr', 'data-test-id', 'login-button');
  });

  it('should submit form on Enter key', () => {
    cy.get('[data-test-id="username"]').type('admin');
    cy.get('[data-test-id="password"]').type('1234{enter}');
    
    cy.get('[data-test-id="welcome-message"]').should('be.visible');
  });

  it('should have sufficient color contrast', () => {
    cy.checkA11y(null, {
      rules: {
        'color-contrast': { enabled: true }
      }
    });
  });

  it('should have proper focus indicators', () => {
    cy.get('[data-test-id="username"]').focus();
    cy.get('[data-test-id="username"]')
      .should('have.css', 'outline-style')
      .and('not.equal', 'none');
  });
});
```

---

## Performance Testing

### Lighthouse CI

```bash
# Install Lighthouse CI
npm install --save-dev @lhci/cli

# Add to package.json
{
  "scripts": {
    "test:perf": "lhci autorun"
  }
}

# Create lighthouserc.json
{
  "ci": {
    "collect": {
      "staticDistDir": "./",
      "url": ["http://localhost:8080"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

### Custom Performance Tests (Cypress)

```javascript
describe('Performance Tests', () => {
  it('should load page within 2 seconds', () => {
    const startTime = performance.now();
    
    cy.visit('/').then(() => {
      const loadTime = performance.now() - startTime;
      expect(loadTime).to.be.lessThan(2000);
    });
  });

  it('should validate credentials within 100ms', () => {
    cy.visit('/');
    
    cy.window().then((win) => {
      const startTime = performance.now();
      
      const result = win.validateCredentials('admin', '1234');
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      expect(duration).to.be.lessThan(100);
      expect(result).to.be.true;
    });
  });
});
```

---

## Test Coverage

### Generate Coverage Report

```bash
# Run tests with coverage
npm run test:coverage

# View coverage report
open coverage/lcov-report/index.html
```

### Coverage Thresholds

Add to `jest.config.js`:

```javascript
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

---

## Test Organization

### Directory Structure

```
project/
├── tests/
│   ├── unit/
│   │   ├── validation.test.js
│   │   ├── message-manager.test.js
│   │   └── view-manager.test.js
│   └── integration/
│       └── login-flow.test.js
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js
│   │   ├── accessibility.cy.js
│   │   └── performance.cy.js
│   ├── fixtures/
│   │   └── users.json
│   └── support/
│       ├── commands.js
│       └── e2e.js
└── package.json
```

---

## Custom Cypress Commands

Create reusable test commands in `cypress/support/commands.js`:

```javascript
// Login command
Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-test-id="username"]').type(username);
  cy.get('[data-test-id="password"]').type(password);
  cy.get('[data-test-id="login-button"]').click();
});

// Check error message
Cypress.Commands.add('shouldShowError', (message) => {
  cy.get('[data-test-id="error-message"]')
    .should('be.visible')
    .and('contain', message);
});

// Check no error
Cypress.Commands.add('shouldNotShowError', () => {
  cy.get('[data-test-id="error-message"]').should('not.exist');
});

// Usage in tests
describe('Login', () => {
  it('should show error for invalid credentials', () => {
    cy.visit('/');
    cy.login('invalid', 'wrong');
    cy.shouldShowError('Login failed');
  });

  it('should login successfully', () => {
    cy.visit('/');
    cy.login('admin', '1234');
    cy.shouldNotShowError();
  });
});
```

---

## Test Data Management

### Fixtures

Create test data in `cypress/fixtures/users.json`:

```json
{
  "valid": {
    "username": "admin",
    "password": "1234"
  },
  "invalid": {
    "username": "invalid",
    "password": "wrong"
  },
  "withWhitespace": {
    "username": "  admin  ",
    "password": "  1234  "
  }
}
```

Use in tests:

```javascript
describe('Login with fixtures', () => {
  it('should login with valid credentials', () => {
    cy.fixture('users').then((users) => {
      cy.login(users.valid.username, users.valid.password);
      cy.shouldNotShowError();
    });
  });

  it('should show error with invalid credentials', () => {
    cy.fixture('users').then((users) => {
      cy.login(users.invalid.username, users.invalid.password);
      cy.shouldShowError('Login failed');
    });
  });
});
```

---

## Continuous Testing

### Run Tests in CI/CD

Add to `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm test
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

---

## Best Practices

### 1. Test Structure

- Use AAA pattern (Arrange, Act, Assert)
- One assertion per test when possible
- Use descriptive test names
- Group related tests with `describe`

### 2. Test Independence

- Each test should be independent
- Use `beforeEach` for setup
- Clean up after tests
- Don't rely on test order

### 3. Test Coverage

- Aim for >80% code coverage
- Focus on critical paths first
- Test edge cases
- Test error conditions

### 4. Test Maintainability

- Use page objects for E2E tests
- Use custom commands for repeated actions
- Keep tests DRY (Don't Repeat Yourself)
- Update tests when code changes

### 5. Test Performance

- Keep tests fast
- Run unit tests frequently
- Run E2E tests before commits
- Use parallel execution

---

## Troubleshooting

### Tests Failing Intermittently

```javascript
// Add proper waits
cy.get('[data-test-id="error-message"]', { timeout: 10000 })
  .should('be.visible');

// Use retry-ability
cy.get('[data-test-id="error-message"]')
  .should('exist')
  .and('be.visible');
```

### Slow Tests

```javascript
// Reduce unnecessary waits
// Use data-test-id instead of complex selectors
// Run tests in parallel
```

### Coverage Not Generated

```bash
# Check jest config
# Ensure coverage is enabled
npm test -- --coverage

# Check file paths in jest.config.js
```

---

## References

- [Jest Documentation](https://jestjs.io/)
- [Cypress Documentation](https://docs.cypress.io/)
- [cypress-axe](https://github.com/component-driven/cypress-axe)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Testing Best Practices](https://testingjavascript.com/)
