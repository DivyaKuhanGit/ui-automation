import { actions as primaryMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as secondaryMenuActions } from '../domain/components/UMSideSubmenu.domain';
import {
  actions as userGroupMainViewActions,
  elements
} from '../domain/components/UserGroups.view.domain';
import { actions as userCreateFlowPageActions } from '../domain/components/CreateNewUserGroup.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { UserGroupType } from '../domain/components/CreateNewUserGroup.domain';
import { v4 } from 'uuid';
import { findTableElementByContainingText } from '../utils/selector.util';

describe('Groups: ', () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
    tenantSelectActions.pickTestTenant().submitSelection();
    primaryMenuActions.clickUserManagementButton();
    secondaryMenuActions.verifyUserGroupButtonVisible().clickUserGroupButton();
  });

  it('SANDBOX', () => {
    //const newGroupId = `automation-${v4()}`;
    const newGroupId = '???';

    // create new group
    // userGroupMainViewActions.clickCreateGroup();
    // userCreateFlowPageActions.typyIntoNameField(newGroupId);
    // userCreateFlowPageActions.selectFromTypeDropDown(UserGroupType.EMPLOYER);
    // userCreateFlowPageActions.clickCreateNewUserGroupButton();

    // verify new group in list
    primaryMenuActions.clickUserManagementButton();
    secondaryMenuActions.verifyUserGroupButtonVisible();
    secondaryMenuActions.clickUserGroupButton();

    elements
      .groupTable()
      .contains('td', newGroupId)
      .siblings()
      .find(`button[aria-controls*='${newGroupId}']`)
      .click();
    cy.focused().parent().contains('li', 'Rename group').click();
    cy.get('[data-cy=submit-button]').click();
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
