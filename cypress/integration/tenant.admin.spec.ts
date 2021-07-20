import { LogInAction, LogInActionsAndStates, LogInState } from "../domain/actions/LogInActionsAndStates";
import { SinglePageHeader, SupportedLanguige } from "../domain/singlePage/SinglePageHeader";


const hostUrl = Cypress.env('user-management-base');
const logInUrl = Cypress.env('log-in-url');

describe('Training Provider Portal: Header', () => {
  beforeEach(() => {
    cy.visit(hostUrl);
  });

  afterEach(() => {
    sessionStorage.clear();
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('Log in', () => {
    it('Header : Click login ==> correct log in url', () => {
      new SinglePageHeader().clickLogin();

      cy.url().should('include', logInUrl);
    });

    it('Header : LogIn available before logged in', () => {
      new LogInActionsAndStates().validateState(LogInState.LOGGED_OUT);
    });

    it('Menu : log out appears once logged in', () => {
      new LogInActionsAndStates()
        .logIn(LogInAction.LOG_IN_AS_ADMIN)
        .validateState(LogInState.LOGED_IN);
    });

    it('Menu : log in available again after log out', () => {
      new LogInActionsAndStates()
        .logIn(LogInAction.LOG_IN_AS_ADMIN)
        .logIn(LogInAction.LOG_OUT)
        .validateState(LogInState.LOGGED_OUT);
    });
  });

  describe('Menu : Localization', () => {
    it('Header: default languige validation', () => {
      let pageHeader = new SinglePageHeader();
      pageHeader.verifyLanguige(SupportedLanguige.ENGLISH);

      cy.wait(3000);
      pageHeader.verifyLanguige(SupportedLanguige.ENGLISH_BRITISH);
    });
  });
});
