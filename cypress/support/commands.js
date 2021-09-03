// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-localstorage-commands';
import { actions as logInPageActions } from '../domain/components/MSLogInPage.domain';

Cypress.Commands.add('sshLogin', (waitForUrl) => {
  cy.visit(Cypress.env('user-management-base') + '/cypress-login')
    .get('#logout')
    .should('be.visible')
    .click()
    .get('#login')
    .should('be.visible')
    .click();

  logInPageActions.verifyOnLogInPage();
  logInPageActions.logInAsAdmin();

  cy.get('#home').should('be.visible').click();
  cy.url().should('include', waitForUrl);
});

Cypress.Commands.add('loginTrainingProvider', () => {
  cy.sshLogin(Cypress.env('user-management-base'));
});
