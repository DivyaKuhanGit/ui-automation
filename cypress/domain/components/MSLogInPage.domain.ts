const userName = Cypress.env('admin-user');
const password = Cypress.env('admin-password');

export const elements = {
  userNameField: () => cy.get('[id="signInName"]'),
  passwordField: () => cy.get('[id="password"]'),
  userManagementBase: () => cy.visit(Cypress.env('user-management-base'))
};

export const actions = {
  logIn: (user: string, password: string) => {
    elements.userNameField().should('be.visible').should('be.enabled').type(user);
    elements.passwordField().should('be.visible').should('be.enabled').type(password);

    cy.get('[id="next"]').click();
    return actions;
  },

  logInAsAdmin: () => {
    actions.logIn(userName, password);
    return actions;
  },

  verifyOnLogInPage: () => {
    cy.url().should('include', Cypress.env('log-in-url'));
    return actions;
  },

  vistUserManagementBase: () => {
    return elements.userManagementBase();
  }
};
