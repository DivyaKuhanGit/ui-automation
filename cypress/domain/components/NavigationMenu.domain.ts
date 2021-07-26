export const elementPaths = {
  logOut: '[data-cy=logOutButton]'
};

export const elements = {
  logOutButton: () => cy.get(elementPaths.logOut),
  userManagementButton: () => cy.get('[data-cy=side-menu]').contains('User Management'),
  bdmButton: () => cy.get('[data-cy=side-menu]').contains('Business Development')
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
