import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as logInActions } from '../domain/components/MSLogInPage.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as umSideActions } from '../domain/components/UMSideSubmenu.domain';
import { retryTillHappy } from '../utils/wait.util';

describe('Side Menu navigation', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('user-management-base'));
    retryTillHappy(logInActions.verifyOnLogInPage);
    logInActions.logInAsAdmin();
    tenantSelectActions.pickTestTenant();
    tenantSelectActions.submitSelection();
  });

  afterEach(() => {
    navMenuActions.logOut();
    cy.visit(Cypress.env('user-management-base'));
    retryTillHappy(logInActions.verifyOnLogInPage);
  });

  it('Validate UserManagement button is available after log in', () => {
    navMenuActions.verifyUserManagementButtonVisible();
  });

  it('Validate BDM is only after access to a tenant with correct permissions', () => {
    navMenuActions.verifyBdmButtonDoesNotExist();
    navMenuActions.clickUserManagementButton();
    umSideActions.clickUserGroupButton();
    tenantSelectActions.pickTestTenant();
    tenantSelectActions.submitSelection();
    navMenuActions.verifyBuisnessDevelopmentButtonVisible().clickBuisnessDevelopmentButton();
  });

  it('Side Menu: validate log in/out', () => {
    // sitting on the log out page returns a promise rejection for auth token
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from failing the test
      return false;
    });

    navMenuActions.logOut();
  });
});
