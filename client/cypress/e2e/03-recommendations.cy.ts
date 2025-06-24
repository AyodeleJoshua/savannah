describe("Recommendations Page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/recommendations");
  });

  it("should display recommendations page with all elements", () => {
    cy.get('[data-testid="recommendations-page"]').should("be.visible");
    cy.get('[data-testid="page-header"]').should("be.visible");
    cy.get('[data-testid="search-input"]').should("be.visible");
    cy.get('[data-testid="multi-select-dropdown"]').should("be.visible");
  });

  it("should load and display recommendations cards", () => {
    cy.get('[data-testid="card"]').should("have.length.greaterThan", 0);
    cy.get('[data-testid="recommendation-title"]').should("be.visible");
  });

  it("should open recommendation details modal when card is clicked", () => {
    cy.get('[data-testid="card"]').first().click();
    cy.get('[data-testid="recommendation-modal"]').should("be.visible");
    cy.get('[data-testid="modal-title"]').should("be.visible");
  });

  it("should close modal when close button is clicked", () => {
    cy.get('[data-testid="card"]').first().click();
    cy.get('[data-testid="recommendation-modal"]').should("be.visible");
    cy.get('[data-testid="modal-close-button"]').click();
    cy.get('[data-testid="recommendation-modal"]').should("not.exist");
  });

  it("should close modal when clicking outside", () => {
    cy.get('[data-testid="card"]').first().click();
    cy.get('[data-testid="recommendation-modal"]').should("be.visible");
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="recommendation-modal"]').should("not.exist");
  });

  it("should display empty state when no recommendations found", () => {
    cy.get('[data-testid="search-input"]').type(
      "nonexistentrecommendation12345",
    );

    cy.get('[data-testid="no-recommendations-message"]').should(
      "contain",
      "No recommendations found",
    );
  });

  it("should navigate to archive page when archive link is clicked/toggled", () => {
    cy.get('[data-testid="archive-link"]').click();
    cy.url().should("include", "/recommendations/archived");
  });
});
