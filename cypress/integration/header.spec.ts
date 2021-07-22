import { actions as logInActions } from '../domain/components/MSLogInPage.domain';
import {
  actions as headerActions,
  SupportedLanguige
} from '../domain/components/SinglePageHeader.domain';
import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';

describe('Training Provider Portal: Header', () => {
  beforeEach(() => {
    cy.reload(true)
    cy.visit(Cypress.env('user-management-base'));
    logInActions.logInAsAdmin();
  });

  // afterEach(() => {
  //   navMenuActions.logOut();
  //   sessionStorage.clear();
  //   cy.clearCookies();
  //   cy.clearLocalStorage();
  // });

  describe('Menu : Localization', () => {
    it('Header: default languige validation', () => {
      
      headerActions.verifyLanguige(SupportedLanguige.ENGLISH);

      cy.wait(3000);
      headerActions.verifyLanguige(SupportedLanguige.ENGLISH_BRITISH);
    });
  });
});
