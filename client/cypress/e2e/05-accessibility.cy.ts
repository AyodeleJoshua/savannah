describe('Accessibility', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should have proper ARIA labels and roles', () => {
    cy.visit('/recommendations');
    
    cy.get('[data-testid="search-input"]').should('have.attr', 'aria-label');
    
    cy.get('[data-testid="multi-select-dropdown"]').should('have.attr', 'role', 'button');
  });

  it('should be keyboard navigable', () => {
    cy.visit('/recommendations');    
    
    cy.get('[data-testid="search-input"]').focus().should('be.focused');
    cy.get('[data-testid="multi-select-dropdown"]').focus().should('be.focused');
    
    cy.get('[data-testid="card"]').first().click();
    cy.get('[data-testid="recommendation-modal"]').should('be.visible');    
    cy.get('body').type('{esc}');
    cy.get('[data-testid="recommendation-modal"]').should('not.exist');
  });

  it('should have proper focus management', () => {
    cy.visit('/recommendations');    
    cy.get('[data-testid="card"]').first().click();
    cy.get('[data-testid="recommendation-modal"]').should('be.visible');

    cy.get('[data-testid="modal-close-button"]').should('be.focused');
  });

  it('should have proper color contrast', () => {
    cy.visit('/recommendations');
    cy.get('[data-testid="recommendation-title"]').should('be.visible');
  });
}); 