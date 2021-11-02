import {
  actions as headerActions,
  SupportedLanguage as SupportedLanguage,
} from "../domain/components/Header.domain";
import { actions as logInPageActions } from "../domain/components/MSLogInPage.domain";

describe("Training Provider Portal: Header", () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
  });

  describe("Menu : Localization", () => {
    it("Header: default language validation", () => {
      headerActions.verifyLanguage(SupportedLanguage.ENGLISH);
    });
  });

  describe("Menu : User Menu", () => {
    it(" validate log out", () => {
      headerActions.logOut();

      logInPageActions.verifyOnLogInPage();
    });
  });
});
