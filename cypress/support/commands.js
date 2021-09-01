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
import { retryTillHappy } from '../utils/wait.util';

Cypress.Commands.add('sshLogin', () => {
  // this is horrible but thanks to how B2C works and the lack of API
  // support from Azure for getting an identity programmatically, plus
  // cypress' lack of multi-domain support means that this was the only
  // reliable solution that worked
  // although cypress clears cookies and local storage, it only does so
  // for the "main domain" being visited which means that the user remains
  // logged in when they get automatically redirected and, since we include
  // a redirect uri, they're then automatically redirected back to the
  // relevant app they visited
  logInPageActions
    .vistUserManagementBase()

    // attempt to wait for an arbitrary length of time to allow us to have been
    // redirected either to the b2c login page, where it waits for input, or
    // since we're already logged in, automatically redirected back to the app
    // we started on
    .wait(1000)
    .url()
    .then((u) => {
      if (!new URL(u).host.includes('smartskillshub.co.uk')) {
        retryTillHappy(logInPageActions.verifyOnLogInPage);
        logInPageActions.logInAsAdmin();
      }
    });
});
