import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as sideSubMenuActions } from '../domain/components/UMSideSubmenu.domain';
import { actions as bdmSideSubMenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';

describe('"User Management" SubMenu', () => {
  beforeEach(() => {
    cy.loginTrainingProvider();

    // Get to user management module
    tenantSelectActions.pickTestTenant().submitSelection();
    navMenuActions.clickUserManagementButton();
  });

  it('Validate "Users" sub-menu option', () => {
    sideSubMenuActions.verifyUsersButtonVisible().clickUserButton();
  });

  it('Validate "User Groups" sub-menu option', () => {
    sideSubMenuActions.verifyUserGroupButtonVisible().clickUserButton();
  });
});

describe('"Business Development" sub-menu', () => {
  beforeEach(() => {
    cy.loginTrainingProvider();

    // get to BDM sub-menu
    tenantSelectActions.pickTestTenant().submitSelection();
    navMenuActions.clickBusinessDevelopmentButton();
  });

  it('Validate "Enquiries" sub-menu option', () => {
    bdmSideSubMenuActions.verifyEnquiriesButtonVisible().clickEnquiriesButton();
  });

  it('Validate "Accounts" sub-menu option', () => {
    bdmSideSubMenuActions.verifyAccountsButtonVisible().clickAccountsButton();
  });

  it('Validate "Opportunities" sub-menu option', () => {
    bdmSideSubMenuActions.verifyOpportunitiesButtonVisible().clickOpportunitiesButton();
  });

  it('Validate "Configuration" sub-menu option', () => {
    bdmSideSubMenuActions.verifyConfigurationButtonVisible().clickConfigurationButton();
  });
});
