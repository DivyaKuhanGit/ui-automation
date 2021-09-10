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

    // verify only 1 item in table afte filtering via search
    // +1 because table header is also a <tr>
    userGroupElements.groupTable().find("tr").should("have.length", 2);

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
