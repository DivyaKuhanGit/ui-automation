import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as logInPageActions } from '../domain/components/MSLogInPage.domain';

describe('Log in', () => {
  beforeEach(() => {
    //@ts-ignore
    cy.clearCookies({domain:null});
    cy.reload(true)
  });

  it('Side Menu: validate log in/out', () => {
    // sitting on the log out page returns a promise rejection for auth token
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from failing the test
      return false;
    });

    cy.visit(Cypress.env('user-management-base'));
    logInPageActions.logInAsAdmin();
    navMenuActions.clickUMButton();
  });
});
