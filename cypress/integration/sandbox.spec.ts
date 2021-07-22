// this can be used to use Cypress UI and easily get path to elements

describe.skip('Sandbox: good for running 1 test and getting paths', () => {
  beforeEach(() => {
    cy.visit( Cypress.env('user-management-base'));
  });

  // afterEach(() => {
  //   sessionStorage.clear();
  //   cy.clearCookies();
  //   cy.clearLocalStorage();
  // });

  describe.skip('Log in', () => {
    it('In the end, there can be only one.', () => {
    });
  });
});