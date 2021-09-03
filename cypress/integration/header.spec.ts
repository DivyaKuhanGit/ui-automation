import { actions as headerActions, SupportedLanguige } from '../domain/components/Header.domain';

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
