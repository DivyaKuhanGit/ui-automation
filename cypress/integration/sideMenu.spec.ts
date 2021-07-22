import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as logInPageActions } from '../domain/components/MSLogInPage.domain';

describe('Log in', () => {
  // beforeEach(() => {
  //   sessionStorage.clear();
  //   cy.clearCookies();
  //   cy.clearLocalStorage();
  //   cy.visit(Cypress.env('log-in-url'));
  //   logInPageActions.logInAsAdmin();
  // });

  // afterEach(() => {
  //   sessionStorage.clear();
  //   cy.clearCookies();
  //   cy.clearLocalStorage();
  // });

  it('Side Menu: validate log in/out', () => {
    cy.clearCookies();
    // sitting on the log out page returns a promise rejection for auth token
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });

    cy.visit(Cypress.env('log-in-url'));
    logInPageActions.logInAsAdmin();
    navMenuActions.verifyLogOutButtonVisible().logOut();
    logInPageActions.verifyOnLogInPage();
  });
});
