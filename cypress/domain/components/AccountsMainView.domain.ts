export const elementPaths = {
  accountsSearchBar: '[data-cy="accounts-search-bar"]',
  accountsFilters: '[aria-label="filters"]',
  accountsTable: '[aria-label="accounts-table"]',
};

export const elements = {
  searchBar: () => {
    cy.get(elementPaths.accountsSearchBar);
  },

  accountsTable: () => {
    cy.get(elementPaths.accountsTable);
  },
};
