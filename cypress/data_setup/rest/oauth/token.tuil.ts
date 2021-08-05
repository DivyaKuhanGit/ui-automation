import { actions as logInPageActions } from '../../../domain/components/MSLogInPage.domain';

// TODO: a better solution that does not require UI is fater and better practice
// TODO: for api token aquisition.  Options for a better solution are WELCOME!

export const logIn = () => {
  cy.visit(Cypress.env('user-management-base'));
  logInPageActions.logInAsAdmin();

  cy.wait(2000);
};

export const getToken = () => {
  cy.window()
    .its('sessionStorage')
    .then((session_storage_key) => {
      for (let i = 0; i < window.sessionStorage.length; i++) {
        if (window.sessionStorage.key(i).includes('accesstoken')) {
          let keyVal = window.sessionStorage.key(i);
          let tokenObject = window.sessionStorage.getItem(keyVal);

          //console.error('TOKEN:::\n' + JSON.parse(tokenObject.toString()).secret);
          return JSON.parse(tokenObject.toString()).secret;
        }
      }
    });
};

export const logInAndGetToken = () => {
  logIn();
  return getToken();
};
