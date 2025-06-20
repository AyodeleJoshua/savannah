describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/dashboard");
  });

  it("should display dashboard content", () => {
    cy.get('[data-testid="dashboard-page"]').should("be.visible");
    cy.get("div").should("contain", "Dashboard");
  });

  it("should be accessible only when authenticated", () => {
    cy.logout();
    cy.visit("/dashboard");

    cy.url().should("include", "/login");
  });
});