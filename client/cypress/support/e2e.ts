/// <reference types="cypress" />

// Import commands.js using ES2015 syntax:
import './commands';

// Add global error handling
Cypress.on('uncaught:exception', () => {
  return false;
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>;
      logout(): Chainable<void>;
      waitForPageLoad(): Chainable<void>;
      checkToastMessage(message: string): Chainable<void>;
    }
  }
}