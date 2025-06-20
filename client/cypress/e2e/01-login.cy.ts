describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display login form with all elements", () => {
    cy.get('[data-testid="login-container"]').should("be.visible");
    cy.get('[data-testid="login-title"]').should("contain", "Welcome back");
    cy.get('[data-testid="login-subtitle"]').should(
      "contain",
      "Sign in to your account to continue",
    );
    cy.get('[data-testid="username-input"]').should("be.visible");
    cy.get('[data-testid="password-input"]').should("be.visible");
    cy.get('[data-testid="login-button"]').should("be.visible");
    cy.get('[data-testid="demo-credentials"]').should("be.visible");
  });

  it("should show validation errors for empty fields", () => {
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="username-input"]').should("have.attr", "required");
    cy.get('[data-testid="password-input"]').should("have.attr", "required");
  });

  it("should display error message for invalid credentials", () => {
    cy.get('[data-testid="username-input"]').type("invalid");
    cy.get('[data-testid="password-input"]').type("invalid");
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="error-message"]').should("be.visible");
  });

  it("should successfully login with valid credentials", () => {
    cy.get('[data-testid="username-input"]').type("admin");
    cy.get('[data-testid="password-input"]').type("password");
    cy.get('[data-testid="login-button"]').click();

    // Should redirect to recommendations page
    cy.url().should("include", "/recommendations");
    cy.get('[data-testid="recommendations-page"]').should("be.visible");
  });

  it("should show loading state during login", () => {
    cy.get('[data-testid="username-input"]').type("admin");
    cy.get('[data-testid="password-input"]').type("password");
    cy.get('[data-testid="login-button"]').click();

    // Button should show loading state
    cy.get('[data-testid="login-button"]').should("contain", "Signing in...");
  });

  it("should redirect to recommendations if already authenticated", () => {
    // Login first
    cy.login();

    // Try to visit login page again
    cy.visit("/login");

    // Should redirect to recommendations
    cy.url().should("include", "/recommendations");
  });

  it("should handle form submission with Enter key", () => {
    cy.get('[data-testid="username-input"]').type("admin");
    cy.get('[data-testid="password-input"]').type("password{enter}");

    cy.url().should("include", "/recommendations");
  });
});
