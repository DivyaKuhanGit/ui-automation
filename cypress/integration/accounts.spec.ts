import { actions as tenantSelectActions } from "../domain/components/TenantSelect.domain";
import { actions as primaryMenuActions } from "../domain/components/NavigationMenu.domain";
import { actions as secondaryMenuActions } from "../domain/components/BdmSubmenu.domain";

describe("Accounts: ", () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
    tenantSelectActions.pickTestTenant().submitSelection();
    navigateToAccountsPage();
  });

  it("Create Account", () => {
    cy.get('[aria-label="accounts-table"]').contains('tr','24')
  });
});

export function navigateToAccountsPage() {
  primaryMenuActions.clickBusinessDevelopmentButton();
  secondaryMenuActions.clickAccountsButton();
}
