import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSumbenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as configMenuActions } from '../domain/components/ConfigurationMenu.domain';
import { actions as opportunityConfigmenuActions } from '../domain/components/OpportunityConfigurationMenu.domain';
import { elements as opportunityConfigElements } from '../domain/components/OpportunityConfigurationMenu.domain';
import { v4 } from 'uuid';


describe("Enquiry Type : ", () => {
    beforeEach(() => {
        cy.loginTrainingProvider();
        // select test tenant
        tenantSelectActions.pickTestTenant();
        tenantSelectActions.submitSelection();

        // open BDM module
        navMenuActions.clickBusinessDevelopmentButton();

        // access configuration in bdm
        bdmSumbenuActions.clickConfigurationButton();
    });

    it("BDM Add New Opportunity Type", () => {
        const randomVal = v4();
        const orignalType = randomVal;

        // access configure enquiries
        configMenuActions.clickOpportunities();

        //Actual Enquiry Type Screen Navigation
        opportunityConfigmenuActions.clickaddNewOpportunityTypeBtn();

        //Actions to be performed inside dialog box
        cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(randomVal);
        cy.focused().blur();
        opportunityConfigElements.addOpportunitySaveBtn().click();
        opportunityConfigmenuActions.clickLoadAllPages();
        opportunityConfigmenuActions.clickAllPages();
        opportunityConfigElements.opportunityTypeTable().contains('p', orignalType);
    });

    it("BDM Rename Opportunity Type", () => {
        const nameVal = v4();
        const renameVal = nameVal;
        const typeName = v4();
        const checkname = 'Renamed-' + typeName;

        // access configure enquiries
        configMenuActions.clickOpportunities();

        //Actual Enquiry Type Screen Navigation
        opportunityConfigmenuActions.clickaddNewOpportunityTypeBtn();

        //Actions to be performed inside dialog box
        cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(nameVal);
        cy.focused().blur();
        opportunityConfigElements.addOpportunitySaveBtn().click();

        //Actions to be performed to find and rename the added value.
        opportunityConfigmenuActions.clickLoadAllPages();
        opportunityConfigmenuActions.clickAllPages();
        opportunityConfigElements.opportunityTypeTable()
            .contains('p', renameVal)
            .parent()
            .siblings()
            .children('button')
            .click();

        opportunityConfigElements.renameBtn().focused().click();

        //Renaming the Old Reason Name to New Name
        opportunityConfigElements.dialogBoxNameField().clear();
        opportunityConfigElements.renameTextfield().type(checkname);
        opportunityConfigElements.addOpportunitySaveBtn().click();
        opportunityConfigmenuActions.clickLoadAllPages();
        opportunityConfigmenuActions.clickAllPages();
        opportunityConfigElements.opportunityTypeTable().contains('p', checkname);
    });
});