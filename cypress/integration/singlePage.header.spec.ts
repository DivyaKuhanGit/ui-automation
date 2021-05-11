import { MSLogInPage } from '../pages/pages/MSLogInPage';
import { SinglePageHeader, SupportedLanguige } from '../pages/singlePage/SinglePageHeader';

describe('User Management: Header', () => {
  const hostUrl = Cypress.env('user-management-base');
  const logInUrl =
    'https://smartapprentice002test.b2clogin.com/smartapprentice002test.onmicrosoft.com/b2c_1_signup_signin/oauth2/v2.0/authorize';

  // beforeEach(() => {
  //   cy.visit(hostUrl);
  // });

  afterEach(() => {
    sessionStorage.clear();
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Header login ', () => {
    new SinglePageHeader().clickLogin();

    cy.url().should('include', logInUrl);
  });

  it('Header login ', () => {
    new SinglePageHeader().clickLogin();

    cy.url().should('include', logInUrl);
  });

  it.only('Header : default languige validation', () => {
    cy.visit(hostUrl);
    cy.wait(3000); // lang change on load

    expect(new SinglePageHeader().getLanguige()).to.equal(SupportedLanguige.ENGLISH);
  });

  // The page object needs fo be fixed for these 2
  it.skip('Validate logged out state ', () => {
    let pageHeder = new SinglePageHeader();
    expect(pageHeder.isLoggedIn()).to.be.false;
  });

  it.skip('Validate loged in state', () => {
    cy.visit(hostUrl);
    new SinglePageHeader().clickLogin();
    new MSLogInPage().logInAsAdmin();

    expect(new SinglePageHeader().isLoggedIn()).to.be.true;
  });
});
