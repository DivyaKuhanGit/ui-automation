/// <reference types="cypress" />

// this stops IDEs from complaining about custom cypress commands
declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Log in bypassing many redirects
       * * expects return to training provider main screen
       * @example
       * cy.loginTrainingProvider()
       */
       loginTrainingProvider(): Chainable<any>
    }

    interface Chainable<Subject> {
      /**
       * Log in bypassing many redirects
       * @example
       * cy.sshLogin()
       */
       sshLogin(): Chainable<any>
    }
  }