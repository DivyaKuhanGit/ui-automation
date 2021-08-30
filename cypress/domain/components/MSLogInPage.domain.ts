import { retryTillHappy } from '../../utils/wait.util';

const userName = Cypress.env('admin-user');
const password = Cypress.env('admin-password');

export const elements = {
  userNameField: () => cy.get('[id="logonIdentifier"]'),
  passwordField: () => cy.get('[id="password"]'),
  userManagementBase: () => cy.visit(Cypress.env('user-management-base'))
};

export const actions = {
  logIn: (user: string, password: string) => {
    retryTillHappy(actions.verifyOnLogInPage);
    elements.userNameField().should('be.visible').should('be.enabled').type(user);
    elements.passwordField().should('be.visible').should('be.enabled').type(password);

    cy.get('[id="next"]').click();
    return this;
  },

  logInAsAdmin: () => {
    actions.logIn(userName, password);
    return this;
  },

  verifyOnLogInPage: () => {
    cy.url().should('include', Cypress.env('log-in-url'));
    return this;
  },

  vistUserManagementBase: () => {
    elements.userManagementBase();
    return this;
  }
};
