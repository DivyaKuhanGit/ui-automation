import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as sideSubMenuActions } from '../domain/components/UMSideSubmenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as logInActions } from '../domain/components/MSLogInPage.domain';
import { retryTillHappy } from '../utils/wait.util';

describe('Side Submenu', () => {
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

  it('Sidesub Menu1: validate user list sumbenu option', () => {
    retryTillHappy(navMenuActions.verifyLogOutButtonVisible);
    navMenuActions.clickUserManagementButton();
    sideSubMenuActions.verifyUsersButtonVisible().clickUserButton();
  });

  it('Sidesub Menu2: validate log in/out', () => {
    navMenuActions.clickUserManagementButton();
    sideSubMenuActions.verifyUserGroupButtonVisible().clickUserGroup();
  });
});
