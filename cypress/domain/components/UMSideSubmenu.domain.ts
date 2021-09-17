export const elements = {
  Users: () => cy.get('[data-cy=side-submenu').contains('Users'),
  UserGroups: () => cy.get('[data-cy=side-submenu').contains('User Groups')
};

export const actions = {
  clickUserButton() {
    elements.Users().click();
    return actions;
  },

  clickUserGroupButton() {
    elements.UserGroups().click();
    return actions;
  },

  verifyUsersButtonVisible() {
    elements.Users().should('be.visible');
    return actions;
  },

  verifyUserGroupButtonVisible() {
    elements.UserGroups().should('be.visible');
    return actions;
  }
};
