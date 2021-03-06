export const elementPaths = {
  logOut: '[data-cy=logOutButton]',
  sideMenu: '[data-cy=side-menu]'
};

export const elements = {
  logOutButton: () => cy.get(elementPaths.logOut),
    userManagementButton: () => cy.get('[data-cy="side-menu-um"]'),
    bdmButton: () => cy.get('[data-cy="side-menu-bdm"]')
};

export const actions = {

 //// CLICK actions 
  logOut() {
    elements.logOutButton().click();
    return actions;
  },

  clickUserManagementButton() {
    elements.userManagementButton().click();
    return actions;
  },

  clickBusinessDevelopmentButton() {
    elements.bdmButton().click();
    return actions;
  },

  //// VERIFY actions  
  verifyLogOutButtonVisible() {
    elements.logOutButton().should('be.visible');
    return actions;
  },

  verifyUserManagementButtonVisible() {
    elements.userManagementButton().should('be.visible');
    return actions;
  },

  verifyUserManagementDoesNotExist() {
    elements.userManagementButton().should('not.exist');
    return actions;
  },

  verifyBusinessDevelopmentButtonVisible() {
    elements.bdmButton().should('be.visible');
    return actions;
  },

  verifyBdmButtonDoesNotExist() {
    elements.bdmButton().should('not.exist');
    return actions;
  },

  verifyUserManagementButtonDoesNotExist() {
    elements.userManagementButton().should('not.exist');
    return actions;
  }
};
