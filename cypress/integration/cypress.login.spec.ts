const hostUrl = 'https://ssh-tenantadmin-test-ui.azurewebsites.net';

describe('User Management UI', () => {
  it('log in 1', () => {
    cy.visit(hostUrl);
    cy.get('[class="MuiButton-label"]').click();
    cy.get('[id="logonIdentifier"]')
      .should('be.visible')
      .should('be.enabled')
      .type('smart.apprentice.automation@gmail.com');

    cy.get('[id="password"]').should('be.visible').should('be.enabled').type('Smart1@Apprentice');

    cy.get('[id="next"]').click();
  });

  it('log in 2', () => {
    cy.visit(hostUrl);
    cy.get('[class="MuiButton-label"]').click();
    cy.get('[id="logonIdentifier"]')
      .should('be.visible')
      .should('be.enabled')
      .type('smart.apprentice.automation@gmail.com');

    cy.get('[id="password"]').should('be.visible').should('be.enabled').type('Smart1@Apprentice');

    cy.get('[id="next"]').click();
  });

  it('log in 3', () => {
    cy.visit(hostUrl);
    cy.get('[class="MuiButton-label"]').click();
    cy.get('[id="logonIdentifier"]')
      .should('be.visible')
      .should('be.enabled')
      .type('smart.apprentice.automation@gmail.com');

    cy.get('[id="password"]').should('be.visible').should('be.enabled').type('Smart1@Apprentice');

    cy.get('[id="next"]').click();
  });

  it('log in 4', () => {
    cy.visit(hostUrl);
    cy.get('[class="MuiButton-label"]').click();
    cy.get('[id="logonIdentifier"]')
      .should('be.visible')
      .should('be.enabled')
      .type('smart.apprentice.automation@gmail.com');

    cy.get('[id="password"]').should('be.visible').should('be.enabled').type('Smart1@Apprentice');

    cy.get('[id="next"]').click();
  });

  it.skip('failing test', () => {
    cy.visit(hostUrl);
    cy.get('does-not-exist').should('be.visible');
  });
});
