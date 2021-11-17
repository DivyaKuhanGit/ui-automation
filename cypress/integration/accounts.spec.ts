import { actions as tenantSelectActions } from "../domain/components/TenantSelect.domain";
import { actions as primaryMenuActions } from "../domain/components/NavigationMenu.domain";
import { actions as secondaryMenuActions } from "../domain/components/BdmSubmenu.domain";
import { actions as createAccountModalActions } from "../domain/components/AccountCreateModal.domain";
import { actions as accountMainViewActions } from "../domain/components/AccountsMainView.domain";
import { v4 as uuid } from "uuid";

// TODO: This is disabled pending SSH-1590
describe.skip("Accounts: ", () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
    tenantSelectActions.pickTestTenant().submitSelection();
    navigateToAccountsPage();
  });

  it("Create Account", () => {
    const newAccountName = uuid();

    accountMainViewActions.clickAddAccountButton();

    createAccountModalActions.typeNewAccountName(newAccountName).submitModal();

    accountMainViewActions
      .verifySearchBarEnabled()
      .searchAccountsByValue(newAccountName)
      .verifyItemExistsInTableByName(newAccountName)
      .openActionsMenuOnFirstItem()
      .selectFirstOptionInActionMenu();

    // waiting for data-cy tag here
    cy.contains("div", newAccountName).should("be.visible");
  });
});

export function navigateToAccountsPage() {
  primaryMenuActions.clickBusinessDevelopmentButton();
  secondaryMenuActions.clickAccountsButton();
}
