import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as sideSubMenuActions } from '../domain/components/UMSideSubmenu.domain';
import { actions as bdmSideSubMenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';

describe('"User Management" Submenu', () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
  });

  it('Validate "Users" sumbenu option', () => {
    tenantSelectActions.pickTestTenant().submitSelection();
    navMenuActions.clickUserManagementButton();
    sideSubMenuActions.verifyUsersButtonVisible().clickUserButton();
  });

  it('Validate "User Groups" sumbenu option', () => {
    navMenuActions.verifyLogOutButtonVisible().clickUserManagementButton();
    sideSubMenuActions.verifyUserGroupButtonVisible().clickUserButton();
  });
});

describe('"Buisness Development" Submenu', () => {
  beforeEach(() => {
    cy.loginTrainingProvider();

    // get to BDM submenu
    tenantSelectActions.pickTestTenant().submitSelection();
    navMenuActions.clickBuisnessDevelopmentButton();
  });

  it('Validate "Enquiries" sumbenu option', () => {
    bdmSideSubMenuActions.verifyEnquiriesButtonVisible().clickEnquiriesButton();
  });

  it('Validate "Accounts" sumbenu option', () => {
    bdmSideSubMenuActions.verifyAccountsButtonVisible().clickAccountsButton();
  });

  it('Validate "Opportunities" sumbenu option', () => {
    bdmSideSubMenuActions.verifyOpportunitiesButtonVisible().clickOpportunitiesButton();
  });

  it('Validate "Configuration" sumbenu option', () => {
    bdmSideSubMenuActions.verifyConfigurationButtonVisible().clickConfigurationButton();
  });
});
