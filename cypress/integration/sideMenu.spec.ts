import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';

describe('Side Menu navigation', () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
  });

  it('Validate UserManagement button is available after log in', () => {
    navMenuActions.verifyUserManagementDoesntExist();
    tenantSelectActions.pickTestTenant().submitSelection();
    navMenuActions.verifyUserManagementButtonVisible();
  });

  it('Validate BDM is only after access to a tenant with correct permissions', () => {
    navMenuActions.verifyBdmButtonDoesNotExist();
    tenantSelectActions.pickTestTenant().submitSelection();
    navMenuActions.verifyBuisnessDevelopmentButtonVisible().clickBuisnessDevelopmentButton();
  });
});
