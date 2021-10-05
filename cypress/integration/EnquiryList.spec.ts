import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSumbenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as bdmConfigMenuActions } from '../domain/components/EmquiryConfigurationMenu.domain';
import { actions as configMenuActions } from '../domain/components/ConfigurationMenu.domain';
import { elements as enquiryConfigmenuElements } from '../domain/components/EmquiryConfigurationMenu.domain';
import { actions as enquiryConfigmenuactions } from '../domain/components/EmquiryConfigurationMenu.domain';
import { v4 } from 'uuid';

describe('Edit Enquiry Status :', () => {
    beforeEach(() => {
        cy.loginTrainingProvider();
        tenantSelectActions.pickTestTenant();
        tenantSelectActions.submitSelection();
        navMenuActions.clickBuisnessDevelopmentButton();
        bdmSumbenuActions.clickConfigurationButton();
        configMenuActions.clickEnquiries();
    });

    it('BDM : Add Enquiry Status', () => {
        const status = v4();
        bdmConfigMenuActions.clickEditEnqStatus();
        bdmConfigMenuActions.clickAddEnqStatus();
        cy.focused().get('[role="dialog"]').get('[data-cy="name-field"]').focused().type(status);
        cy.focused().blur();
        enquiryConfigmenuElements.addEnqSavebtn().click();
    });

    it("BDM Edit Enquiry Type", () => {
        const actualVal = v4();
        const editedVal = actualVal;
        const statusVal = v4();
        const refStatus = statusVal;

        // access configure enquiries
        configMenuActions.clickEnquiries();

        //Actions to Add New Enquiry Status
        enquiryConfigmenuactions.clickEditEnqStatus();
        enquiryConfigmenuactions.clickAddEnqStatus();

        //Actions to be performed inside dialog box
        cy.focused().get('[role="dialog"]').get('[data-cy="name-field"]').focused().type(statusVal);
        cy.focused().blur();
        enquiryConfigmenuElements.addEnqSavebtn().click();

        // access configure enquiries
        configMenuActions.clickEnquiries();

        //Actual Enquiry Type Screen Navigation
        enquiryConfigmenuactions.clickAddNewEnqType();

        //Actions to be performed inside dialog box
        cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(actualVal);
        cy.focused().blur();
        enquiryConfigmenuElements.addEnqSavebtn().click();

        //Actions to click Action menu and Edit Button
        cy.get(enquiryTypeTable)
            .contains('p', editedVal)
            .parent()
            .siblings()
            .children('button')
            .click()

        //Action to select Edit Button from Focused Menuitem list.
        cy.focused().siblings().contains('p', "Edit")
            .click();

        //Actions to be performed to add Enquiry Status from Dropdown box.
        cy.get('[data-cy="enquiry-type-statuses"]')
            .children()
            .children()
            .children()
            .children('button')
            .click();
        //Type and checks the required EnquiryStatus
        cy.focused().get('[data-cy="enquiry-type-statuses"]').type(refStatus)
        cy.get('[type="checkbox"]').check()
            .focused()
            .blur();
    });
});