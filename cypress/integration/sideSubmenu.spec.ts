import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as sideSubMenuActions } from '../domain/components/UMSideSubmenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as logInPageActions } from '../domain/components/MSLogInPage.domain';

describe('Side Submenu', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('user-management-base'));
    cy.wait(1000);
    // logInPageActions.logInAsAdmin();
  });

  it('Sidesub Menu1: validate user list sumbenu option', () => {
    logInPageActions.logInAsAdmin();
    cy.wait(4000);
    tenantSelectActions.pickTestTenant();
    tenantSelectActions.submitSelection();
    navMenuActions.clickUserManagementButton();
    // FIXME: change to validate
    sideSubMenuActions.clickUserList();
  });

  it('Sidesub Menu2: validate log in/out', () => {
    navMenuActions.clickUserManagementButton();
    // FIXME: change to validate
    sideSubMenuActions.clickUserGroup();
  });
});
