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
    return this;
  },

  clickUserManagementButton() {
    elements.userManagementButton().click();
    return this;
  },

  clickBuisnessDevelopmentButton() {
    elements.bdmButton().click();
    return this;
  },

  //// VERIFY actions  
  verifyLogOutButtonVisible() {
    elements.logOutButton().should('be.visible');
    return this;
  },

  verifyUserManagementButtonVisible() {
    elements.userManagementButton().should('be.visible');
    return this;
  },

  verifyBuisnessDevelopmentButtonVisible() {
    elements.bdmButton().should('be.visible');
    return this;
  },

  verifyBdmButtonDoesNotExist() {
    elements.bdmButton().should('not.exist');
    return this;
  },

  verifyUserManagementButtonDoesNotExist() {
    elements.userManagementButton().should('not.exist');
    return this;
  }
};
