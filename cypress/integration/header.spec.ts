import { actions as logInPageActions } from '../domain/components/MSLogInPage.domain';
import { actions as headerActions, SupportedLanguige } from '../domain/components/Header.domain';
import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { retryTillHappy } from '../utils/wait.util';

describe('Training Provider Portal: Header', () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
  });

  describe('Menu : Localization', () => {
    it('Header: default languige validation', () => {
      headerActions.verifyLanguige(SupportedLanguige.ENGLISH);

      // this wait shouldn't be necessary
      cy.wait(1000);
      headerActions.verifyLanguige(SupportedLanguige.ENGLISH_BRITISH);
    });
  });
});
