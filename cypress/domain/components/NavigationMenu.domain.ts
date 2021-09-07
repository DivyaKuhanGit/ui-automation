export const elementPaths = {
  logOut: '[data-cy=logOutButton]',
  sideMenu: '[data-cy=side-menu]'
};

export const elements = {
  logOutButton: () => cy.get(elementPaths.logOut),
  userManagementButton: () => cy.get(elementPaths.sideMenu).contains('User Management'),
  bdmButton: () => cy.get(elementPaths.sideMenu).contains('Business Development')
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

  clickBuisnessDevelopmentButton() {
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

  verifyUserManagementDoesntExist() {
    elements.userManagementButton().should('not.exist');
    return actions;
  },

  verifyBuisnessDevelopmentButtonVisible() {
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
