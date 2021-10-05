import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSumbenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as configMenuActions } from '../domain/components/ConfigurationMenu.domain';
import { actions as enquiryConfigmenuactions } from '../domain/components/EmquiryConfigurationMenu.domain';
import { elements as enquiryConfigElements } from '../domain/components/EmquiryConfigurationMenu.domain';
import { v4 } from 'uuid';


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

    //it("BDM Add New Enquiry Type", () => {
    //    const randomVal = v4();
    //    const orignalType = randomVal;

    //    // access configure enquiries
    //    configMenuActions.clickEnquiries();

    //    //Actual Enquiry Type Screen Navigation
    //    enquiryConfigmenuactions.clickAddNewEnqType();

    //    //Actions to be performed inside dialog box
    //    cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(randomVal);
    //    cy.focused().blur();
    //    enquiryConfigElements.addEnqSaveBtn().click();
    //    enquiryConfigmenuactions.clickLoadAllPages();
    //    enquiryConfigmenuactions.clickAllPages();
    //    enquiryConfigElements.enquiryTypeTable().contains('p', orignalType);
    //});

    //it("BDM Rename Enquiry Type", () => {
    //    const nameVal = v4();
    //    const renameVal = nameVal;
    //    const typeName = v4();
    //    const checkname = 'Renamed-' + typeName;

    //    // access configure enquiries
    //    configMenuActions.clickEnquiries();

    //    //Actual Enquiry Type Screen Navigation
    //    enquiryConfigmenuactions.clickAddNewEnqType();

    //    //Actions to be performed inside dialog box
    //    cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(nameVal);
    //    cy.focused().blur();
    //    enquiryConfigElements.addEnqSaveBtn().click();

    //    //Actions to be performed to find and rename the added value.
    //    enquiryConfigmenuactions.clickLoadAllPages();
    //    enquiryConfigmenuactions.clickAllPages();
    //    enquiryConfigElements.enquiryTypeTable()
    //        .contains('p', renameVal)
    //        .parent()
    //        .siblings()
    //        .children('button')
    //        .click();

    //    cy.get('li[data-cy*="rename-button"]').focused().click();

    //    //Renaming the Old Reason Name to New Name
    //    cy.get('[role=dialog]').get('[data-cy="name-field"]').clear();
    //    enquiryConfigElements.renameTextfield().type(checkname);
    //    enquiryConfigElements.addEnqSaveBtn().click();
    //    enquiryConfigmenuactions.clickLoadAllPages();
    //    enquiryConfigmenuactions.clickAllPages();
    //    enquiryConfigElements.enquiryTypeTable().contains('p', checkname);
    //});

    it("BDM : Create Enquiry Type and Set Enquiry Status", () => {
        const actualVal = "99d68d7b-596e-4cea-96c7-86a51c13d181";//v4();
        const editedVal = actualVal;
        const statusVal = "9cfcea02-4eb0-4108-bf72-1487bdd16dd1";//v4();
        const refStatus = statusVal;

        //Actions to get response after loading all pages
        let body: object;
        cy.intercept('/business-development/enquiry-status?page=0', (request) => {
            request.continue((response) => {
                body = response.body;
            });
        }).as('resp');

        // access configure enquiries
        configMenuActions.clickEnquiries();

        //Actions to Add New Enquiry Status
        enquiryConfigmenuactions.clickEditEnqStatus();
        //enquiryConfigmenuactions.clickAddEnqStatus();

        ////Actions to be performed inside dialog box
        //cy.focused().get('[role="dialog"]').get('[data-cy="name-field"]').focused().type(statusVal);
        //cy.focused().blur();
        //enquiryConfigElements.addEnqSaveBtn().click();

        // wait for the request to the api to get the first page of enquiry close reasons
        cy.wait('@resp').then((r) => {
            const totalItems = body.totalItems;
            // calculate the total number of pages we're going to need
            const pages = Math.floor(totalItems / 10);
            loadAllPages(pages);
        })

        enquiryConfigElements.enquiryStatusItem().contains(statusVal);

        // access configure enquiries
        configMenuActions.clickEnquiries();

        ////Actual Enquiry Type Screen Navigation
        //enquiryConfigmenuactions.clickAddNewEnqType();

        ////Actions to be performed inside dialog box
        //cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(actualVal);
        //cy.focused().blur();
        //enquiryConfigElements.addEnqSaveBtn().click();

        //Actions to click Action menu and Edit Button
        enquiryConfigmenuactions.clickLoadAllPages();
        enquiryConfigmenuactions.clickAllPages();
        enquiryConfigElements.enquiryTypeTable()
            .contains('p', editedVal)
            .parent()
            .siblings()
            .children('button')
            .click();

        //Action to select Edit Button from Focused Menuitem list.
        cy.focused().siblings().contains('p', "Edit")
            .click();

        //Actions to click Enquiry Status Dropdown box.
        // enquiryConfigElements.enquiryTypeStatus()
        //     .children()
        //     .children()
        //     .children()
        //     .children('button')
        //     .click()
            // .focused()
            // .contains('refStatus').check({ force: true })
        //cy.scrollTo('bottom', { ensureScrollable: false })

        ////Type and checks the required EnquiryStatus
        //cy.focused()
        //enquiryConfigElements.enquiryTypeStatus().type(refStatus)
        //cy.get('[type="checkbox"]').check()
        //    .focused()
        //    .blur();

        //cy.get('data-cy="enquiry-type-statuses"').contains('li',refStatus).click();
        //enquiryConfigElements.enquiryTypeStatus().contains('li',refStatus);

        enquiryConfigElements.enquiryTypeStatus().type('-/-');
        cy.focused().type('{downarrow}').type('{enter}');
    });
});

function loadAllPages(pages, level = 0) {
    if (level > 30 || pages > 30) {
        throw 'Exceeded recursion depth';
    }
    if (level >= pages) {
        return;
    }
    return cy
        .get('button:not([disabled])[data-cy=enquiry-statuses-load-more-button]')
        .then((e) => {
            cy.wrap(e).click();
            return loadAllPages(pages, level + 1);
        });
}