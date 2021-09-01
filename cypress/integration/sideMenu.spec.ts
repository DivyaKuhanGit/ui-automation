import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as logInPageActions } from '../domain/components/MSLogInPage.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as umSideActions } from '../domain/components/UMSideSubmenu.domain';
import { retryTillHappy } from '../utils/wait.util';
import { actions as logInActions } from '../domain/components/MSLogInPage.domain';

describe('Side Menu navigation', () => {
  // FIXME: sadly, none of this actually worked

  // beforeEach(() => {
  //   // This clears out third party cookies which forces MS logout state
  //   // @ts-ignore
  //   cy.clearCookies({ domain: null });
  //   cy.clearLocalStorage();
  //   cy.reload(true);

  //   cy.visit(Cypress.env('user-management-base'));
  //   logInPageActions.logInAsAdmin();
  // });

  // afterEach(() => {
  //   // sitting on the log out page returns a promise rejection for auth token
  //   Cypress.on('uncaught:exception', (err, runnable) => {
  //     // returning false here prevents Cypress from failing the test
  //     return false;
  //   });

  //   // This clears out third party cookies which forces MS logout state
  //   //@ts-ignore
  //   cy.clearCookies({ domain: null });
  //   cy.reload(true);
  // });

  beforeEach(() => {
    cy.sshLogin();
  });

  it('Validate UserManagement button is available after log in', () => {
    navMenuActions.verifyUserManagementButtonVisible();
  });

  it('Validate BDM is only after access to a tenant with correct permissions', () => {
    navMenuActions.verifyBdmButtonDoesNotExist();
    navMenuActions.clickUserManagementButton();
    umSideActions.clickUserGroup();
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
