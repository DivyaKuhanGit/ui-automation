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
    return this;
  },

  clickOpportunities() {
    elements.opportunities().click();
    return this;
  },

  clickAccounts() {
    elements.accounts().click();
    return this;
  },

  clickPriceBook() {
    elements.priceBook().click();
    return this;
  },

  verifyEnquiriesVisible() {
    elements.enquiries().should('be.visible');
    return this;
  },

  verifyOpportunitiesVisible() {
    elements.opportunities().should('be.visible');
    return this;
  },

  verifyAccountsVisible() {
    elements.accounts().should('be.visible');
    return this;
  },

  verifyPriceBookVisible() {
    elements.priceBook().should('be.visible');
    return this;
  }
};
