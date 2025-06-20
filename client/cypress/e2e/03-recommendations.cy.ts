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

  it("should filter recommendations by search term", () => {
    const searchTerm = "test";
    cy.get('[data-testid="search-input"]').type(searchTerm);

    cy.wait(500);

    cy.get('[data-testid="card"]').should("exist");
  });

  it("should filter recommendations by provider tags", () => {
    cy.get('[data-testid="multi-select-dropdown"]').click();
    cy.get('[data-testid="dropdown-option"]').first().click();

    cy.wait(500);

    cy.get('[data-testid="card"]').should("exist");
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

  it("should load more recommendations on scroll", () => {
    const initialCount = cy.get('[data-testid="card"]').its("length");

    cy.scrollTo("bottom");

    cy.wait(1000);

    cy.get('[data-testid="card"]').should(
      "have.length.greaterThan",
      initialCount,
    );
  });

  it("should show loading states", () => {
    cy.get('[data-testid="loading-indicator"]').should("exist");

    cy.scrollTo("bottom");
    cy.get('[data-testid="loading-more-indicator"]').should("exist");
  });

  it("should navigate to archive page", () => {
    cy.get('[data-testid="archive-link"]').click();
    cy.url().should("include", "/recommendations/archived");
  });

  it("should handle error states gracefully", () => {
    cy.intercept("GET", "**/recommendations**", { statusCode: 500 });
    cy.visit("/recommendations");

    cy.get('[data-testid="error-message"]').should(
      "contain",
      "An error has occurred",
    );
  });
});
