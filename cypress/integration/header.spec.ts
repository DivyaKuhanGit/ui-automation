import { actions as logInActions } from '../domain/components/MSLogInPage.domain';
import {
  actions as headerActions,
  SupportedLanguige
} from '../domain/components/Header.domain';
import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';

describe('Training Provider Portal: Header', () => {

  beforeEach(() => {
    //@ts-ignore
    cy.clearCookies({ domain: null });
    cy.reload(true);

    cy.visit(Cypress.env('user-management-base'));
    logInActions.logInAsAdmin();
  });


  describe('Menu : Localization', () => {
    it('Header: default languige validation', () => {
      
      headerActions.verifyLanguige(SupportedLanguige.ENGLISH);

      cy.wait(3000);
      headerActions.verifyLanguige(SupportedLanguige.ENGLISH_BRITISH);
    });
  });
});
