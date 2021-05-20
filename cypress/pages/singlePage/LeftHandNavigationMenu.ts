const MENU_HAMBUGER_BUTTON = '.MuiSvgIcon-root';
const MENU_X_BUTTON =
  '.MuiPaper-root > .MuiGrid-root > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root > path';
const LOG_OUT_BUTTON = '.MuiBox-root > .MuiButtonBase-root > .MuiButton-label';

export class LeftHandNavigationMenu {
  public expandMenu(): LeftHandNavigationMenu {
    cy.get(MENU_HAMBUGER_BUTTON).click();
    return this;
  }

  public colapseMenu(): LeftHandNavigationMenu {
    cy.get(MENU_X_BUTTON).click();
    return this;
  }

  public clickOutOfMenu(): LeftHandNavigationMenu {
    cy.get('body').click(0, 0);
    return this;
  }

  public clickLogOut(): LeftHandNavigationMenu {
    cy.get(LOG_OUT_BUTTON).click();
    return this;
  }

  // checks for existance of "log out" button
  public validateLoggedIn() {
    this.clickOutOfMenu().expandMenu();

    cy.get(LOG_OUT_BUTTON)
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('Logout');
      });

    return this;
  }
}
