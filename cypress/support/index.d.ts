/// <reference types="cypress" />

// this stops IDEs from complaining about custom cypress commands
declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Log in bypassing many redirects
       * @example
       * cy.sshLogin()
       */
       loginTrainingProvider(): Chainable<any>
    }
  }