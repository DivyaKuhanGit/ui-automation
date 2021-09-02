import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as sideSubMenuActions } from '../domain/components/UMSideSubmenu.domain';
import { actions as bdmSideSubMenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { retryTillHappy } from '../utils/wait.util';

describe('"User Management" Submenu', () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
  });

  it('Validate "Users" sumbenu option', () => {
    tenantSelectActions.pickTestTenant();
    tenantSelectActions.submitSelection();
    navMenuActions.clickUserManagementButton();
    sideSubMenuActions.verifyUsersButtonVisible().clickUserButton();
  });

  it('Validate "User Groups" sumbenu option', () => {
    retryTillHappy(navMenuActions.verifyLogOutButtonVisible);

    navMenuActions.clickUserManagementButton();
    sideSubMenuActions.verifyUserGroupButtonVisible().clickUserGroup();
  });
});

describe('"Buisness Development" Submenu', () => {
  beforeEach(() => {
    cy.sshLogin();

    // get to BDM submenu
    tenantSelectActions.pickTestTenant();
    tenantSelectActions.submitSelection();
    navMenuActions.clickBuisnessDevelopmentButton();
  });

  it('Validate "Enquiries" sumbenu option', () => {
    bdmSideSubMenuActions.verifyEnquiriesButtonVisible();
    bdmSideSubMenuActions.clickEnquiriesButton();
  });

  it('Validate "Accounts" sumbenu option', () => {
    bdmSideSubMenuActions.verifyAccountsButtonVisible();
    bdmSideSubMenuActions.clickAccountsButton();
  });

  it('Validate "Opportunities" sumbenu option', () => {
    bdmSideSubMenuActions.verifyOpportunitiesButtonVisible();
    bdmSideSubMenuActions.clickOpportunitiesButton();
  });

  it('Validate "Configuration" sumbenu option', () => {
    bdmSideSubMenuActions.verifyConfigurationButtonVisible();
    bdmSideSubMenuActions.clickConfigurationButton();
  });
});
