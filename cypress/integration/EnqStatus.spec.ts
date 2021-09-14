import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSumbenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as bdmConfigMenuActions } from '../domain/components/EmquiryConfigurationMenu.domain';
import { actions as configMenuActions } from '../domain/components/ConfigurationMenu.domain';
import { elements as enquiryConfigmenuElements } from '../domain/components/EmquiryConfigurationMenu.domain';
import { uuid } from 'uuidv4';
const randomVal = uuid();
const orignalVal = randomVal;

describe('Edit Enquiry Status :', () => {
    beforeEach(() => {
        cy.loginTrainingProvider();
    });

    it('BDM : Add Enquiry Status', () => {
        // get to configuration menu

        // select test tenant
        tenantSelectActions.pickTestTenant();
        tenantSelectActions.submitSelection();

        // open BDM module
        navMenuActions.clickBuisnessDevelopmentButton();

        // access configuration in bdm
        bdmSumbenuActions.clickConfigurationButton();

        // access configure enquiries
        configMenuActions.clickEnquiries();

        // Actual Enquiry Config screen navigation
        bdmConfigMenuActions.clickEditEnqStatus();
        bdmConfigMenuActions.clickAddEnqStatus();

        //Actions to be performed inside dialog box
        cy.focused().get('[data-cy="name-field"]').should('be.focused').type(uuid());
        cy.focused().blur();
        //Clicks Save button of the dialog box.
        enquiryConfigmenuElements.addEnqSavebtn().click();
    });

    //it('BDM : Rename Enquiry Status', () => {
    //    // get to configuration menu

    //    // select test tenant
    //    tenantSelectActions.pickTestTenant();
    //    tenantSelectActions.submitSelection();

    //    // open BDM module
    //    navMenuActions.clickBuisnessDevelopmentButton();

    //    // access configuration in bdm
    //    bdmSumbenuActions.clickConfigurationButton();

    //    // access configure enquiries
    //    configMenuActions.clickEnquiries();

    //    // Actual Enquiry Config screen navigation
    //    bdmConfigMenuActions.clickEditEnqStatus();
    //    bdmConfigMenuActions.clickAddEnqStatus();

    //    //Actions to be performed inside dialog box
    //    cy.focused().get('[data-cy="name-field"]').should('be.focused').type(uuid());
    //    cy.focused().blur();
    //    //Clicks Save button of the dialog box.
    //    enquiryConfigmenuElements.addEnqSavebtn().click();
    //});
});