import { SinglePageHeader } from "../domain/singlePage/SinglePageHeader";


describe('Sandbox: good for running 1 test and getting paths', () => {
  beforeEach(() => {
    cy.visit( Cypress.env('user-management-base'));
  });

  afterEach(() => {
    sessionStorage.clear();
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('Log in', () => {
    it('In the end, there can be only one.', () => {
      //new SinglePageHeader().clickLogin();
      




    });
  });
});