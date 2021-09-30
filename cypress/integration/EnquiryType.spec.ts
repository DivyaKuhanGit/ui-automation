import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSumbenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as configMenuActions } from '../domain/components/ConfigurationMenu.domain';
import { actions as enquiryConfigmenuactions } from '../domain/components/EmquiryConfigurationMenu.domain';
import { elements as enquiryConfigElements } from '../domain/components/EmquiryConfigurationMenu.domain';
import { v4 } from 'uuid';
const enquiryTypeTable = '[data-cy=enquiry-types-table]';

describe("Enquiry Type : ", () => {
    beforeEach(() => {
        cy.loginTrainingProvider();
        // select test tenant
        tenantSelectActions.pickTestTenant();
        tenantSelectActions.submitSelection();

        // open BDM module
        navMenuActions.clickBuisnessDevelopmentButton();

        // access configuration in bdm
        bdmSumbenuActions.clickConfigurationButton();
    });

    it("BDM Add New Enquiry Type", () => {
        const randomVal = v4();
        const orignalType = randomVal;

        // access configure enquiries
        configMenuActions.clickEnquiries();

        //Actual Enquiry Type Screen Navigation
        enquiryConfigmenuactions.clickAddNewEnqType();

        //Actions to be performed inside dialog box
        cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(randomVal);
        cy.focused().blur();
        enquiryConfigElements.addEnqSavebtn().click();

        cy.get(enquiryTypeTable).contains('p', orignalType);
    });

    it("BDM Rename Enquiry Type", () => {
        const nameVal = v4();
        const renameVal = nameVal;

        // access configure enquiries
        configMenuActions.clickEnquiries();

        //Actual Enquiry Type Screen Navigation
        enquiryConfigmenuactions.clickAddNewEnqType();

        //Actions to be performed inside dialog box
        cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(nameVal);
        cy.focused().blur();
        enquiryConfigElements.addEnqSavebtn().click();

        //Actions to be performed to find and rename the added value.
        
        cy.get(enquiryTypeTable)
            .contains('p', renameVal)
            .parent()
            .siblings()
            .children('button')
            .click();

        cy.get('li[data-cy*="rename-button"]').focused().click();

        //Renaming the Old Reason Name to New Name
        cy.get('[role=dialog]').get('[data-cy="name-field"]').clear();
        enquiryConfigElements.renameTextfield().type('Renamed-' + v4());
        enquiryConfigElements.addEnqSavebtn().click();
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
        enquiryConfigElements.addEnqSavebtn().click();

        // access configure enquiries
        configMenuActions.clickEnquiries();

        //Actual Enquiry Type Screen Navigation
        enquiryConfigmenuactions.clickAddNewEnqType();

        //Actions to be performed inside dialog box
        cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(actualVal);
        cy.focused().blur();
        enquiryConfigElements.addEnqSavebtn().click();

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