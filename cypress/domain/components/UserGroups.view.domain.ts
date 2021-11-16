export const elements = {
  searchBox: () => cy.get('[data-cy="user-groups-search-bar"]'),
  createNewGroupButton: () => cy.contains("Create new group"),
  groupTable: () => cy.get('[aria-label="table"]'),
  emptyGroupTable: () => cy.contains("p", "No user groups available"),
  nextPage: () => cy.get('[title="Next page"]'),
};

export enum GroupItemMenuActions {
  RENAME = "Rename group",
  DELETE_GROUP = "Delete group",
  PERMISSIONS = "Group permissions",
  USERS = "Group users",
}

export const actions = {
  clickCreateGroup() {
    elements.createNewGroupButton().click();
    return actions;
  },

  verifyGroupsTableEmpty() {
    elements.emptyGroupTable().should("be.visible");
    return actions;
  },

  searchForGroupByName(groupName: string) {
    elements.searchBox().should('be.visible').type(`${groupName}`).click();
    elements.searchBox().type('{enter}');
    return actions;
  },

  openSideMenuByGroupName(groupName: string) {
    elements
      .groupTable()
      .contains("td", groupName)
      .siblings()
      .find('svg')
      .click();

    return actions;
  },

  /**
   * expects groups action item menu to be open
   */
  renameGroup(renameAppendText: string) {
    cy.focused().contains("li", GroupItemMenuActions.RENAME).click();
    cy.focused().type(renameAppendText);
    cy.get("[data-cy=submit-button]").click();

    return actions;
  },

  verifyRenameDialogueClosed() {
    cy.get(`[role="dialog"]`).should("not.exist");
    return actions;
  },

  verifyOnlyOneItemInTable() {
    // verify only 1 item in table after filtering via search
    // +1 because table header is also a <tr>
    elements.groupTable().find("tr").should("have.length", 2);
    return actions;
  },
};
