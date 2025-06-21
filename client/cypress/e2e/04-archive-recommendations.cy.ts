describe('Archive Recommendations Page', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/recommendations');
    cy.get('[data-testid="card"]').first().click();
    cy.get('[data-testid="recommendation-modal"]').should('be.visible');
    cy.get('[data-testid="recommendation-modal"]')
      .find('button')
      .contains('Archive')
      .click();
    cy.wait(1000);
    cy.visit('/recommendations/archived');
  });

  it('should display archive page with breadcrumbs', () => {
    cy.get('[data-testid="archive-page"]').should('be.visible');
    cy.get('[data-testid="breadcrumbs"]').should('be.visible');
    cy.get('[data-testid="archive-title"]').should('contain', 'Recommendations Archive');
  });

  it('should display breadcrumb navigation', () => {
    cy.get('[data-testid="breadcrumb-item"]').should('have.length', 2);
    cy.get('[data-testid="breadcrumb-item"]').first().should('contain', 'Recommendations');
    cy.get('[data-testid="breadcrumb-item"]').last().should('contain', 'Archive');
  });

  it('should navigate back to recommendations from breadcrumb', () => {
    cy.get('[data-testid="breadcrumb-item"]').first().click();
    cy.url().should('include', '/recommendations');
    cy.url().should('not.include', '/archived');
  });

  it('should load and display archived recommendations', () => {
    cy.get('[data-testid="card"]').should('have.length.greaterThan', 0);
    cy.get('[data-testid="archived-indicator"]').should('be.visible');
  });

  it('should open archived recommendation details modal', () => {
    cy.get('[data-testid="card"]').first().click();
    cy.get('[data-testid="recommendation-modal"]').should('be.visible');
    cy.get('[data-testid="modal-title"]').should('be.visible');
  });

  it('should display empty state for no archived recommendations', () => {
    cy.get('[data-testid="search-input"]').type('nonexistentarchived12345');
    
    cy.get('[data-testid="no-archived-message"]').should('contain', 'No archived recommendations found');
  });

  // it('should load more archived recommendations on scroll', () => {
  //   const initialCount = cy.get('[data-testid="card"]').its('length');
    
  //   cy.scrollTo('bottom');
  //   cy.wait(1000);
    
  //   cy.get('[data-testid="card"]').should('have.length.greaterThan', initialCount);
  // });
}); 