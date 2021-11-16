export const elementPaths = {
  accountsSearchBar: '[data-cy="accounts-search-bar"]',
  accountsFilters: '[aria-label="filters"]',
  accountsTable: '[aria-label="accounts-table"]',
  addAccountButton: "[data-cy=add-account-button]",
};

export const elements = {
  searchBar: () => {
    return cy.get(elementPaths.accountsSearchBar);
  },

  accountsTable: () => {
    return cy.get(elementPaths.accountsTable);
  },

  addAccountButton: () => {
    return cy.get(elementPaths.addAccountButton);
  },
};

export const actions = {
  verifyItemExistsInTableByName: (itemName: string) => {
    elements.accountsTable().children().contains("p", itemName).should("exist");

    return actions;
  },

  openActionsMenuOnFirstItem: () => {
    elements.accountsTable().find('[data-cy="item-0-actions"]').click();

    return actions;
  },

  selectFirstOptionInActionMenu: () => {
    cy.focused().type("{downarrow}").click();

    return actions;
  },

  clickAddAccountButton: () => {
    elements.addAccountButton().click();

    return actions;
  },

  searchAccountsByValue: (value: string) => {
    elements.searchBar().type(value);

    return actions;
  },

  verifySearchBarEnabled:()=>{
    elements.searchBar().should('not.be.enabled')
    return actions;
  }
};
