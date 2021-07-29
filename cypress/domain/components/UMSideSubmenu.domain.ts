export const elements = {
    Users: () => cy.get('[data-cy=side-submenu').contains('Users'),
    UserGroups: () => cy.get('[data-cy=side-submenu').contains('User Groups'),
};

export const actions = {
    UserList() {
    elements.Users().click();
    return this;
    },

    UserGroup() {
    elements.UserGroups().click();
    return this;
    }
};
