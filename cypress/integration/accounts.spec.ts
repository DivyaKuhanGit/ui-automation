import { actions as tenantSelectActions } from "../domain/components/TenantSelect.domain";
import { actions as primaryMenuActions } from "../domain/components/NavigationMenu.domain";
import { actions as secondaryMenuActions } from "../domain/components/BdmSubmenu.domain";
import { v4 as uuid } from "uuid";

const addAccountButton = () => cy.get("[data-cy=add-account-button]");
const newAccountNameField = () => cy.get("#name");
const newAccountModalSubmit = () => cy.get("[data-cy=submit-button]");
const newAccountModalCancel = () => cy.get("[data-cy=cancel-button]");
const searchForAccountTextFiled = () =>
  cy.get("[data-testid=SearchIcon]").siblings();//.contains("input");
const accountsTableView = () => cy.get('[aria-label="accounts-table"]');

describe("Accounts: ", () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
    tenantSelectActions.pickTestTenant().submitSelection();
    navigateToAccountsPage();
  });

  it("Create Account", () => {
    const newAccountName = uuid();

    addAccountButton().click();
    newAccountNameField().type(newAccountName);
    newAccountModalSubmit().click();

    // FIXME: BUG here
    newAccountModalCancel().click();

    searchForAccountTextFiled().type(newAccountName);
    accountsTableView().contains('tr',newAccountName).contains('[data-testid=MoreVertOutlinedIcon]').click();
  });

  // it("Create Account", () => {
  //   cy.get('[aria-label="accounts-table"]').contains('tr','24')
  // });
});

export function navigateToAccountsPage() {
  primaryMenuActions.clickBusinessDevelopmentButton();
  secondaryMenuActions.clickAccountsButton();
}
