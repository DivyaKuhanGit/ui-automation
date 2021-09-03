import { actions as logInActions } from '../domain/components/MSLogInPage.domain';
import { actions as headerActions, SupportedLanguige } from '../domain/components/Header.domain';
import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { retryTillHappy } from '../utils/wait.util';

describe('Training Provider Portal: Header', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('user-management-base'));
    retryTillHappy(logInActions.verifyOnLogInPage);
    logInActions.logInAsAdmin();
  });

  afterEach(() => {
    navMenuActions.logOut();
    cy.visit(Cypress.env('user-management-base'));
    retryTillHappy(logInActions.verifyOnLogInPage);
  });

  describe('Menu : Localization', () => {
    it('Header: default languige validation', () => {
      headerActions.verifyLanguige(SupportedLanguige.ENGLISH);

      cy.wait(3000);
      headerActions.verifyLanguige(SupportedLanguige.ENGLISH_BRITISH);
    });
  });
});
