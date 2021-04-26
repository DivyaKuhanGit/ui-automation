const hostUrl = 'https://ssh-tenantadmin-test-ui.azurewebsites.net';

describe('User Management UI', () => {
  it('log in', () => {
    cy.visit(hostUrl);
    cy.get('[class="MuiButton-label"]').click();
    cy.get('[id="logonIdentifier"]')
      .should('be.visible')
      .should('be.enabled')
      .type('smart.apprentice.automation@gmail.com');

    cy.get('[id="password"]').should('be.visible').should('be.enabled').type('Smart1@Apprentice');

    cy.get('[id="next"]').click();
  });

  it('failing test', () => {
    cy.visit(hostUrl);
    cy.get('does-not-exist').should('be.visible');
  });
});
