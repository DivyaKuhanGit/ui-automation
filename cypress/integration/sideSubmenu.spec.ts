import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as sideSubMenuActions } from '../domain/components/UMSideSubmenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as logInPageActions } from '../domain/components/MSLogInPage.domain';
import { retryTillHappy } from '../utils/wait.util';

describe('Side Submenu', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('user-management-base'));
  });

  it('Sidesub Menu1: validate user list sumbenu option', () => {
    logInPageActions.logInAsAdmin();
    cy.wait(4000);
    tenantSelectActions.pickTestTenant();
    tenantSelectActions.submitSelection();
    navMenuActions.clickUserManagementButton();
    sideSubMenuActions
      .verifyUsersButtonVisible()
      .clickUserButton();
  });

  it('Sidesub Menu2: validate log in/out', () => {
    retryTillHappy(navMenuActions.verifyLogOutButtonVisible);

    navMenuActions.clickUserManagementButton();
    sideSubMenuActions
      .verifyUserGroupButtonVisible()
      .clickUserGroup();
  });
});
