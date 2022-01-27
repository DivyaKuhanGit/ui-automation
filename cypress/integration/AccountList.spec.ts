import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as configMenuActions } from '../domain/components/ConfigurationMenu.domain';
import { elements as accountConfigElements } from '../domain/components/AccountConfigurationMenu.domain';
import { v4 as uuid } from "uuid";

describe("Accounts: ", () => {
    beforeEach(() => {
        cy.loginTrainingProvider();
        // select test tenant
        tenantSelectActions.pickTestTenant();
        tenantSelectActions.submitSelection();

        // open BDM module
        navMenuActions.clickBusinessDevelopmentButton();
    });

    it("Create Account Form", () => {
        const formName = "FormName-" + uuid();
        const formTitle = "FormTitle-" + uuid();

        configMenuActions.clickAccounts();
        accountConfigElements.addAccountForm().click();
        accountConfigElements.addFormName().type(formName);
        accountConfigElements.title().type(formTitle);
        accountConfigElements.description().type("Automated Form For Testing");
        accountConfigElements.addGroup().click()
        accountConfigElements.title().eq(1).type('Group Title')
        accountConfigElements.description().eq(1).type('Group Description')
        accountConfigElements.saveBtn().eq(1).click();

        //Custom Field Creation
        accountConfigElements.addCustomField().click();
        accountConfigElements.title().eq(1).type("Custom Title")
        accountConfigElements.description().eq(1).type("Custom Description")
        accountConfigElements.maxLength().type("100");
        accountConfigElements.saveBtn().eq(1).click();

        //Save and use the Form
        accountConfigElements.saveBtn().click();
        accountConfigElements.clearBtn().select
        accountConfigElements.accountForm().type(formName)
            .type('{downarrow}').select;
        accountConfigElements.useForm().click();
    });
});