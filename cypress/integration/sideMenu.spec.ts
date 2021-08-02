import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as logInPageActions } from '../domain/components/MSLogInPage.domain';

describe('Log in', () => {
  beforeEach(() => {
    // This clears out third party cookies which forces MS logout state
    //@ts-ignore
    cy.clearCookies({ domain: null });
    // someone on stack overflow said this seems to work better on second try??
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.reload(true);

    cy.visit(Cypress.env('user-management-base'));
    logInPageActions.logInAsAdmin();
  });

  afterEach(() => {
    // sitting on the log out page returns a promise rejection for auth token
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from failing the test
      return false;
    });

    // This clears out third party cookies which forces MS logout state
    //@ts-ignore
    cy.clearCookies({ domain: null });
    cy.reload(true);
  });

  it('Validate UserManagement button is available after log in', () => {
    navMenuActions.verifyUserManagementButtonVisible();
  });

  it('Side Menu: validate log in/out', () => {
    // sitting on the log out page returns a promise rejection for auth token
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from failing the test
      return false;
    });

    navMenuActions.logOut();
  });

  it('Validate BDM is only after access to a tenant with correct permissions', () => {
    navMenuActions.verifyBdmButtonDoesNotExist();
    tenantSelectActions.pickTestTenant();
    tenantSelectActions.submitSelection();
    navMenuActions.verifyBuisnessDevelopmentButtonVisible().clickBuisnessDevelopmentButton();
  });
});
