import { actions as primaryMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as secondaryMenuActions } from '../domain/components/UMSideSubmenu.domain';
import { actions as userGroupMainViewActions } from '../domain/components/UserGroups.view.domain';
import { actions as userCreateFlowPageActions } from '../domain/components/CreateNewUserGroup.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { UserGroupType } from '../domain/components/CreateNewUSerGroup.domain';
import { v4 } from 'uuid';

describe('Groups: ', () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
    tenantSelectActions
      .pickTestTenant()
      .submitSelection();
    primaryMenuActions
      .clickUserManagementButton();
    secondaryMenuActions
      .verifyUserGroupButtonVisible()
      .clickUserGroupButton();
  });


  it('SANDBOX', () => {
    //const newGroupId = `automation-${v4()}`;
    const newGroupId = "???";

    // create new group
    userGroupMainViewActions.clickCreateGroup();
    userCreateFlowPageActions.typyIntoNameField(newGroupId);
    userCreateFlowPageActions.selectFromTypeDropDown(UserGroupType.EMPLOYER);
    userCreateFlowPageActions.clickCreateNewUserGroupButton();

    // verify new group in list
    primaryMenuActions.clickUserManagementButton();
    secondaryMenuActions.verifyUserGroupButtonVisible();
    secondaryMenuActions.clickUserGroupButton();

    userGroupMainViewActions.getGroupByName(newGroupId)
    .then((x) => {
      console.log('TADA: ' + x.text());
    });
  });

  it.skip('Group permissions', () => {
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

    userGroupMainViewActions.getGroupByName(newGroupId).then((x) => {
      console.log('TADA: ' + x.text());
    });
  });
});
