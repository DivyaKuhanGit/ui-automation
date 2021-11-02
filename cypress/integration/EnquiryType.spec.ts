import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSumbenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as configMenuActions } from '../domain/components/ConfigurationMenu.domain';
import { actions as enquiryConfigmenuactions } from '../domain/components/EmquiryConfigurationMenu.domain';
import { elements as enquiryConfigElements } from '../domain/components/EmquiryConfigurationMenu.domain';
import { v4 } from 'uuid';
const randomVal = v4();
const enquiryTypeTable = '[data-cy=enquiry-types-table]';

describe("Enquiry Type : ", () => {
    beforeEach(() => {
        cy.loginTrainingProvider();
    });

    it("BDM Add New Enquiry Type", () => {
        // select test tenant
        tenantSelectActions.pickTestTenant();
        tenantSelectActions.submitSelection();

        // open BDM module
        navMenuActions.clickBuisnessDevelopmentButton();

        // access configuration in bdm
        bdmSumbenuActions.clickConfigurationButton();

        // access configure enquiries
        configMenuActions.clickEnquiries();

        //Actual Enquiry Type Screen Navigation
        enquiryConfigmenuactions.clickAddNewEnqType();

        //Actions to be performed inside dialog box
        cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(randomVal);
        cy.focused().blur();
        enquiryConfigElements.addEnqSavebtn().click();
        cy.get(enquiryTypeTable).contains('p',randomVal).should('be.visible');
    });
});