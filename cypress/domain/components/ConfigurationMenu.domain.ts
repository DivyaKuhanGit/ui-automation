export const elementPaths = {
  menu: '[data-cy=bdm-configuration-secondary]'
};

export const elements = {
  enquiries: () => cy.get(elementPaths.menu).contains('Enquiries'),
  opportunities: () => cy.get(elementPaths.menu).contains('Opportunities'),
  accounts: () => cy.get(elementPaths.menu).contains('Accounts'),
  priceBook: () => cy.get(elementPaths.menu).contains('Price Book')
};

export const actions = {
  clickEnquiries() {
    elements.enquiries().click();
    return actions;
  },

  clickOpportunities() {
    elements.opportunities().click();
    return actions;
  },

  clickAccounts() {
    elements.accounts().click();
    return actions;
  },

  clickPriceBook() {
    elements.priceBook().click();
    return actions;
  },

  verifyEnquiriesVisible() {
    elements.enquiries().should('be.visible');
    return actions;
  },

  verifyOpportunitiesVisible() {
    elements.opportunities().should('be.visible');
    return actions;
  },

  verifyAccountsVisible() {
    elements.accounts().should('be.visible');
    return actions;
  },

  verifyPriceBookVisible() {
    elements.priceBook().should('be.visible');
    return actions;
  }
};
