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
    navigateToGroupLisitingPage();
  });

  // TODO: this test is overloaded, need to think of a good way
  //  to break it up into separate testable actions
  it("Group permissions", () => {
    let newGroupName = `automation-${v4()}`;

    // create new group
    userGroupMainViewActions.clickCreateGroup();
    userCreateFlowPageActions.typyIntoNameField(newGroupName);
    userCreateFlowPageActions.selectFromTypeDropDown(UserGroupType.EMPLOYER);
    userCreateFlowPageActions.clickCreateNewUserGroupButton();

    // get back to group list
    navigateToGroupLisitingPage();

    searchForGroupByName(newGroupName);

    // get into items menu by containing text
    userGroupElements
      .groupTable()
      .contains("td", newGroupName)
      .siblings()
      .find(`button[aria-controls*='${newGroupName}']`)
      .click();

    // rename item
    cy.focused().contains("li", GroupItemMenuActions.RENAME).click();
    cy.focused().type("-updated");
    newGroupName += "-updated";
    cy.get("[data-cy=submit-button]").click();

    searchForGroupByName(newGroupName);

    // get into items menu by containing text
    userGroupElements
      .groupTable()
      .contains("td", newGroupName)
      .siblings()
      .find(`button[aria-controls*='${newGroupName}']`)
      .click();

    // click delete group
    cy.focused()
      .contains("li", GroupItemMenuActions.RENAME)
      .siblings()
      .contains("li", GroupItemMenuActions.DELETE_GROUP)
      .click();

    // confirm delete
    cy.get('[role="dialog"]').contains("span", "Confirm").click();

    navigateToGroupLisitingPage();
    searchForGroupByName(newGroupName);

    cy.get(".MuiAutocomplete-noOptions").should("contain.text", "No options");
  });
});

describe("Group Permissions: ", () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
    tenantSelectActions.pickTestTenant().submitSelection();
    navigateToGroupLisitingPage();

    // pick menu for first8 group (expects at least one to exist)
    // the other option is to create one and search for it (adds more time to execution)
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

    // recepie : https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/fundamentals__dynamic-tests/cypress/integration/list-spec.js
    extractKeysFromStringEnum(BdmPermissions).forEach((permission) => {
      cy.get('[data-cy="permissions-table"]')
        .contains("td", permission)
        .siblings()
        .find('[type="checkbox"]')
        .should("exist");
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

export function navigateToGroupLisitingPage() {
  primaryMenuActions.clickUserManagementButton();
  secondaryMenuActions.verifyUserGroupButtonVisible();
  secondaryMenuActions.clickUserGroupButton();
}

export function searchForGroupByName(groupName: string) {
  userGroupElements.searchBox().type(`${groupName}`).click();
  // this is flaky
  cy.wait(1000);
  userGroupElements.searchBox().type("{enter}");
}
