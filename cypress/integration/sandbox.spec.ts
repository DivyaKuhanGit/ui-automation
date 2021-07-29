import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as logInPageActions } from '../domain/components/MSLogInPage.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';

describe('Log in', () => {
  beforeEach(() => {
    //@ts-ignore
    cy.clearCookies({ domain: null });
    cy.reload(true);
  });

  it('Side Menu: validate log in/out', () => {
    // sitting on the log out page returns a promise rejection for auth token
    // Cypress.on('uncaught:exception', (err, runnable) => {
    //   // returning false here prevents Cypress from failing the test
    //   return false;
    // });
    cy.clearCookies()
    cy.visit(Cypress.env('user-management-base'));
    cy.wait(3000);
  //  logInPageActions.logInAsAdmin();
    tenantSelectActions.pickTestTenant();
    tenantSelectActions.submitSelection();
    navMenuActions.clickBDMButton();
  });
});
