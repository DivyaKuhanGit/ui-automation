export class MSLogInPage {
  private userName = Cypress.env('admin-user');
  private password = Cypress.env('admin-password');
  private hostUrl = Cypress.env('user-management-base');

  public logIn(user: string, password: string) {
    cy.visit(this.hostUrl);
    cy.get('[class="MuiButton-label"]').click();
    cy.get('[id="logonIdentifier"]').should('be.visible').should('be.enabled').type(user);
    cy.get('[id="password"]').should('be.visible').should('be.enabled').type(password);

    cy.get('[id="next"]').click();
    return this;
  }

  public logInAsAdmin() {
    return this.logIn(this.userName, this.password);
  }
}
