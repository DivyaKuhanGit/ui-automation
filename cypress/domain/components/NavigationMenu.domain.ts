// FIXME: this is flaky, needs cy-data tags
export const elementPaths = {
  logOut: '[data-cy=logOutButton]',
  um: '.MuiButtonBase-root > .MuiTypography-root',
  bdm: '.jss6 > .MuiList-root > :nth-child(2)'
};

export const elements = {
  logOutButton: () => cy.get(elementPaths.logOut, /*{ timeout: 10000 }*/),
  userManagementButton: () => cy.get(elementPaths.um),
  bdmButton: () => cy.get(elementPaths.bdm)
};

export const actions = {
  logOut() {
    elements.logOutButton().click();
    return this;
  },

  clickUMButton() {
    elements.userManagementButton().click();
    return this;
  },

  clickBDMButton() {
    elements.bdmButton().click();
    return this;
  },

  verifyLogOutButtonVisible() {
    elements.logOutButton().should('be.visible');
    return this;
  }
};
