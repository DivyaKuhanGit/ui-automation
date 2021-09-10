export const elements = {
  searchBox: () => cy.get('[aria-autocomplete="list"]'),
  createNewGroupButton: () => cy.contains("Create new group"),
  groupTable: () => cy.get('[aria-label="table"]'),
  nextPage: () => cy.get('[title="Next page"]')
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

  getGroupByName(name: string) {
    console.log("starting to search");
    do {
      try {
        return elements.groupTable().contains("li", name);
      } catch (e) {
        actions.clickNextPage();
      }
    } while (actions.isNextPageAvailable());
    return undefined;
  },

  isNextPageAvailable(): boolean {
    elements.nextPage().then((x) => {
      return !x.is("enabled");
    });
    return false;
  },

  clickNextPage() {
    elements.nextPage().then((x) => {
      x.click();
    });
  },
};
