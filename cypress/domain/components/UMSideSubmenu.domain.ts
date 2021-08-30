export const elements = {
  Users: () => cy.get('[data-cy=side-submenu').contains('Users'),
  UserGroups: () => cy.get('[data-cy=side-submenu').contains('User Groups')
};

export const actions = {
  clickUserButton() {
    elements.Users().click();
    return this;
  },

  clickUserGroupButton() {
    elements.UserGroups().click();
    return this;
  },

  verifyUsersButtonVisible() {
    elements.Users().should('be.visible');
    return this;
  },

  verifyUserGroupButtonVisible() {
    elements.UserGroups().should('be.visible');
    return this;
  }
};
