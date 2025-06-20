/// <reference types="cypress" />

// Import commands.js using ES2015 syntax:
import './commands';

// Add global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>;
      logout(): Chainable<void>;
      waitForPageLoad(): Chainable<void>;
      checkToastMessage(message: string): Chainable<void>;
    }
  }
}