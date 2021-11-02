import { actions as primaryMenuActions } from "../domain/components/NavigationMenu.domain";
import { actions as secondaryMenuActions } from "../domain/components/UMSideSubmenu.domain";
import {
  actions as userGroupMainViewActions,
  elements as userGroupElements,
  GroupItemMenuActions,
} from "../domain/components/UserGroups.view.domain";
import { actions as userCreateFlowPageActions } from "../domain/components/CreateNewUserGroup.domain";
import { actions as tenantSelectActions } from "../domain/components/TenantSelect.domain";
import { UserGroupType } from "../domain/components/CreateNewUserGroup.domain";
import { v4 } from "uuid";
import {
  BdmPermissions,
  Modules,
  UmPermissions,
} from "../domain/components/UserGroup.permissions.view";
import { extractKeysFromStringEnum } from "../utils/enum.util";

describe("Groups: ", () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
    tenantSelectActions.pickTestTenant().submitSelection();
    navigateToGroupListingPage();
  });

  // TODO: this test is overloaded, need to think of a good way
  //  to break it up into separate testable actions
  it("Groups CRUD", () => {
    let newGroupName = `automation-${v4()}`;

    createNewGroup(newGroupName);
    navigateToGroupListingPage();
    userGroupMainViewActions
      .searchForGroupByName(newGroupName)
      .verifyOnlyOneItemInTable()
      .openSideMenuByGroupName(newGroupName);

    var renameAppendText = "-updated";
    userGroupMainViewActions
      .renameGroup(renameAppendText)
      .verifyRenameDialogueClosed();
    newGroupName += renameAppendText;

    // I don't like this, the state of the search box persists between searches
    // maybe do a path re-navigation again?  have to navigate out first, ie user management or bdm
    navigateToGroupListingPage();
    userGroupMainViewActions
      .searchForGroupByName(renameAppendText)
      .verifyOnlyOneItemInTable()
      .openSideMenuByGroupName(newGroupName);

    // click delete group
    cy.focused()
      .contains("li", GroupItemMenuActions.RENAME)
      .siblings()
      .contains("li", GroupItemMenuActions.DELETE_GROUP)
      .click();

    // confirm delete
    cy.get('[role="dialog"]').contains("button", "Confirm").click();

    navigateToGroupListingPage();
    userGroupMainViewActions.searchForGroupByName(newGroupName);

    cy.contains("p", "No user groups available").should('be.visible');
  });
});

describe("Group Permissions: ", () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
    tenantSelectActions.pickTestTenant().submitSelection();
    navigateToGroupListingPage();

    // pick menu for first group (expects at least one to exist)
    // the other option is to create one and search for it
    // - adds more time to execution
    // - requires cleanup
    userGroupElements
      .groupTable()
      .find("td")
      .first()
      .siblings()
      .find("button")
      .click();

    // access permission in group's menu
    cy.focused()
      .contains("li", GroupItemMenuActions.RENAME)
      .siblings()
      .contains("p", GroupItemMenuActions.PERMISSIONS)
      .click();
  });

  it(`Check All ${Modules.BDM} permissions`, () => {
    cy.get('[aria-labelledby="permissions-modules"]')
      .contains("span", Modules.BDM)
      .click();

    extractKeysFromStringEnum(BdmPermissions).forEach((permission) => {
      cy.get('[data-cy="permissions-table"]')
        .contains("td", permission)
        .siblings()
        .find('[type="checkbox"]')
        .should("exist")
        .should("be.enabled");
    });
  });

  it(`Check All ${Modules.UM} permissions`, () => {
    cy.get('[aria-labelledby="permissions-modules"]')
      .contains("span", Modules.UM)
      .click();

    extractKeysFromStringEnum(UmPermissions).forEach((permission) => {
      cy.get('[data-cy="permissions-table"]')
        .contains("td", permission)
        .siblings()
        .find('[type="checkbox"]')
        .should("exist");
    });
  });
});

export function navigateToGroupListingPage() {
  primaryMenuActions.clickUserManagementButton();
  secondaryMenuActions.verifyUserGroupButtonVisible();
  secondaryMenuActions.clickUserGroupButton();
}

export function createNewGroup(newGroupName: string) {
  userGroupMainViewActions.clickCreateGroup();
  userCreateFlowPageActions.typeIntoNameField(newGroupName);
  userCreateFlowPageActions.selectFromTypeDropDown(UserGroupType.EMPLOYER);
  userCreateFlowPageActions.clickCreateNewUserGroupButton();
}
