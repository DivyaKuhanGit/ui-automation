import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as umSideActions } from '../domain/components/UMSideSubmenu.domain';

describe('Side Menu navigation', () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
  });

  it('Validate UserManagement button is available after log in', () => {
    navMenuActions.verifyUserManagementButtonVisible();
  });

  it('Validate BDM is only after access to a tenant with correct permissions', () => {
    navMenuActions
      .verifyBdmButtonDoesNotExist()
      .clickUserManagementButton();
    umSideActions
      .clickUserGroupButton();
    tenantSelectActions
      .pickTestTenant()
      .submitSelection();
    navMenuActions
      .verifyBuisnessDevelopmentButtonVisible()
      .clickBuisnessDevelopmentButton();
  });

  it('Side Menu: validate log in/out', () => {
    navMenuActions.logOut();
  });
});
