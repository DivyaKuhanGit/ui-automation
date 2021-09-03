export const elements = {
  testTenant: () => cy.contains(Cypress.env("test-tenant-name")),
  selectButton: () => cy.get('.MuiBox-root > .MuiButtonBase-root > .MuiButton-label')
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
