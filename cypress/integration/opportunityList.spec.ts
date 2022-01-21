import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
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
    });

    it("Opportunity Creation", () => {
        const nameVal = "Automated_"+v4();

        // Navigate to Opportunity Creation page
        configMenuActions.clickOpportunities();
        opportunityConfigmenuActions.clickCreateOpportunity();

        // Fill opportunity Creation details
        opportunityConfigElements.nameField().type(nameVal);

    });
});