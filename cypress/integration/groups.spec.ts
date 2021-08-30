import { actions as primaryMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as secondaryMenuActions } from '../domain/components/UMSideSubmenu.domain';
import { actions as userGroupMainViewActions } from '../domain/components/UserGroups.view.domain';
import { actions as userCreateFlowPageActions } from '../domain/components/CreateNewUSerGroup.domain';
import { retryTillHappy } from '../utils/wait.util';
import { actions as logInActions } from '../domain/components/MSLogInPage.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { UserGroupType } from '../domain/components/CreateNewUSerGroup.domain';
import { v4 } from 'uuid';

describe('Groups: ', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('user-management-base'));
    retryTillHappy(logInActions.verifyOnLogInPage);
    logInActions.logInAsAdmin();
    tenantSelectActions.pickTestTenant();
    tenantSelectActions.submitSelection();
    primaryMenuActions.clickUserManagementButton();
    secondaryMenuActions.verifyUserGroupButtonVisible();
    secondaryMenuActions.clickUserGroupButton();
  });

  // afterEach(() => {
  //   navMenuActions.logOut();
  //   cy.visit(Cypress.env('user-management-base'));
  //   retryTillHappy(logInActions.verifyOnLogInPage);
  // });

  it('Group permissions', () => {
    const newGroupId = `automation-${v4()}`;

    // create new group
    userGroupMainViewActions.clickCreateGroup();
    userCreateFlowPageActions.typyIntoNameField(newGroupId);
    userCreateFlowPageActions.selectFromTypeDropDown(UserGroupType.EMPLOYER);
    userCreateFlowPageActions.clickCreateNewUserGroupButton();

    // verify new group in list
    primaryMenuActions.clickUserManagementButton();
    secondaryMenuActions.verifyUserGroupButtonVisible();
    secondaryMenuActions.clickUserGroupButton();
  });
});
