export const elements = {
  testTenant: () => cy.contains(Cypress.env("test-tenant-name")),
  selectButton: () => cy.get('form').contains('button','Select')
};

export const actions = {
  pickTestTenant: () => {
    elements.testTenant().click();
    return actions;
  },

  submitSelection: () => {
    elements.selectButton().click();
    return actions;
  }
};
