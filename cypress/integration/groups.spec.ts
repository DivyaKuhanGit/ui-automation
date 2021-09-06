import { actions as primaryMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as secondaryMenuActions } from '../domain/components/UMSideSubmenu.domain';
import {
  actions as userGroupMainViewActions,
  elements as userGroupElements,
  GroupItemMenuActions
} from '../domain/components/UserGroups.view.domain';
import { actions as userCreateFlowPageActions } from '../domain/components/CreateNewUserGroup.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { UserGroupType } from '../domain/components/CreateNewUserGroup.domain';
import { v4 } from 'uuid';

describe('Groups: ', () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
    tenantSelectActions.pickTestTenant().submitSelection();
    primaryMenuActions.clickUserManagementButton();
    secondaryMenuActions.verifyUserGroupButtonVisible().clickUserGroupButton();
  });

  // TODO: this test is overloaded, need to think of a good way
  //  to break it up into separate testable actions
  it('Group permissions', () => {
    let newGroupId = `automation-${v4()}`;

    // create new group
    userGroupMainViewActions.clickCreateGroup();
    userCreateFlowPageActions.typyIntoNameField(newGroupId);
    userCreateFlowPageActions.selectFromTypeDropDown(UserGroupType.EMPLOYER);
    userCreateFlowPageActions.clickCreateNewUserGroupButton();

    // get back to group list
    primaryMenuActions.clickUserManagementButton();
    secondaryMenuActions.verifyUserGroupButtonVisible();
    secondaryMenuActions.clickUserGroupButton();

    // Search for group
    userGroupElements.searchBox().type(`${newGroupId}`).click();
    // neet to wait for rest call to return with some data
    cy.wait(1000);

    // select the result
    userGroupElements.searchBox().type('{enter}');

    // get into items menu by containing text
    userGroupElements
      .groupTable()
      .contains('td', newGroupId)
      .siblings()
      .find(`button[aria-controls*='${newGroupId}']`)
      .click();

    // rename item
    cy.focused().contains('li', GroupItemMenuActions.RENAME).click();
    cy.focused().type('-updated');
    newGroupId += '-updated';
    cy.get('[data-cy=submit-button]').click();

    // Search for group
    userGroupElements.searchBox().type(`${newGroupId}`).click();
    cy.wait(1000);
    userGroupElements.searchBox().type('{enter}');

    // get into items menu by containing text
    userGroupElements
      .groupTable()
      .contains('td', newGroupId)
      .siblings()
      .find(`button[aria-controls*='${newGroupId}']`)
      .click();

    // click delete group
    cy.focused()
      .contains('li', GroupItemMenuActions.RENAME)
      .siblings()
      .contains('li', GroupItemMenuActions.DELETE_GROUP)
      .click();

    // confirm delete
    cy.get('[role="dialog"]').contains('span', 'Confirm').click();
  });
});
