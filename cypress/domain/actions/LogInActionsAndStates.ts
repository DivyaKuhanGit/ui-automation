import { LeftHandNavigationMenu } from '../singlePage/LeftHandNavigationMenu';
import { SinglePageHeader } from '../components/SinglePageHeader.domain';
import { MSLogInPage } from '../components/MSLogInPage.domain';

export enum LogInState {
  LOGED_IN,
  LOGGED_OUT
}

export enum LogInAction {
  LOG_IN,
  LOG_OUT,
  LOG_IN_AS_ADMIN
}

export class LogInActionsAndStates {
  // This can be validated  with cookies, but it does not
  // check for the ui visible changes
  // https://docs.microsoft.com/en-us/azure/active-directory-b2c/cookie-definitions
  validateState(expectedState: LogInState) {
    switch (expectedState) {
      case LogInState.LOGED_IN:
        new LeftHandNavigationMenu().validateLoggedIn();
        break;
      case LogInState.LOGGED_OUT:
        new SinglePageHeader().validateLoggedOut();
        break;
    }

    return this;
  }

  logIn(action: LogInAction, user?: string, password?: string) {
    switch (action) {
      case LogInAction.LOG_IN_AS_ADMIN:
        new SinglePageHeader().clickLogin();
        new MSLogInPage().logInAsAdmin();
        break;
      case LogInAction.LOG_IN:
        new SinglePageHeader().clickLogin();
        new MSLogInPage().logIn(user, password);
        break;
      case LogInAction.LOG_OUT:
        new LeftHandNavigationMenu().clickLogOut();
        break;
    }
    return this;
  }
}
