export class LeftHandNavigationMenu {
  public expandMenu(): LeftHandNavigationMenu {
    return this;
  }

  public colapseMenu(): LeftHandNavigationMenu {
    cy.get(
      '.MuiPaper-root > .MuiGrid-root > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root > path'
    ).click();
    return this;
  }

  public clickOutOfMenu(): LeftHandNavigationMenu {
    cy.get('body').click(0, 0);
    return this;
  }
}
