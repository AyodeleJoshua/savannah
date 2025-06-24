// Custom commands for common operations

Cypress.Commands.add('login', (username = 'admin', password = 'password') => {
  cy.visit('/login');
  cy.get('[data-testid="username-input"]').type(username);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-button"]').click();
  cy.url().should('not.include', '/login');
});

Cypress.Commands.add('logout', () => {
  cy.clearLocalStorage();
  cy.clearCookies();
  
  cy.get('body').then(($body) => {
    if ($body.find('[data-testid="logout-button"]').length > 0) {
      cy.get('[data-testid="logout-button"]').click();
      cy.url().should('include', '/login');
    }
  });
});

Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('[data-testid="loading"]').should('not.exist');
});

Cypress.Commands.add('checkToastMessage', (message: string) => {
  cy.get('[data-testid="toast"]').should('contain', message);
}); 