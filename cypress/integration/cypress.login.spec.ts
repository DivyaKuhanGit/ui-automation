const hostUrl = 'https://ssh-tenantadmin-test-ui.azurewebsites.net';

describe('User Management UI', () => {
  it('log in 1', () => {
    cy.visit(hostUrl);
    cy.get('[class="MuiButton-label"]').click();
    cy.get('[id="logonIdentifier"]')
      .should('be.visible')
      .should('be.enabled')
      .type(Cypress.env('admin-user'));

    cy.get('[id="password"]').should('be.visible').should('be.enabled').type(Cypress.env('admin-password'));

    cy.get('[id="next"]').click();
  });
});
