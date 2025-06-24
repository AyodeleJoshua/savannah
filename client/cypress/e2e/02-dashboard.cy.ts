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

  it("should logout user and redirect to login when logout button is clicked", () => {
    cy.get('[data-testid="dashboard-page"]').should("be.visible");
    
    cy.getCookie("authToken").should("exist");
    
    cy.get('[data-testid="logout-button"]').click();
    
    cy.url().should("include", "/login");
    cy.url().should("not.include", "/dashboard");
    
    cy.get('[data-testid="login-container"]').should("be.visible");
    
    cy.getCookie("authToken").should("not.exist");
  });

  it("should prevent access to dashboard after logout", () => {
    cy.get('[data-testid="logout-button"]').click();
    
    cy.url().should("include", "/login");
    
    cy.visit("/dashboard");
    
    cy.url().should("include", "/login");
    cy.url().should("not.include", "/dashboard");
  });
});