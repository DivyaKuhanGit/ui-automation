import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
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
        navMenuActions.clickBusinessDevelopmentButton();
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
        enquiryConfigElements.addEnqSaveBtn().click();
        enquiryConfigmenuactions.clickLoadAllPages();
        enquiryConfigmenuactions.clickAllPages();
        enquiryConfigElements.enquiryTypeTable().contains('p', orignalType);
    });

    it("BDM Rename Enquiry Type", () => {
        const nameVal = v4();
        const renameVal = nameVal;
        const typeName = v4();
        const checkname = 'Renamed-' + typeName;

        //Enquiry Table Pagination
        let body: object;
        cy.intercept('/business-development/enquiry-types?page=0&pageSize=100', (request) => {
            request.continue((response) => {
                body = response.body;
            });
        }).as('tresp');


        // access configure enquiries
        configMenuActions.clickEnquiries();

        //Actual Enquiry Type Screen Navigation
        enquiryConfigmenuactions.clickAddNewEnqType();

        //Actions to be performed inside dialog box
        cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(nameVal);
        enquiryConfigElements.addEnqSaveBtn().click();

        //Actions to be performed to find and rename the added value.
        enquiryConfigmenuactions.clickLoadAllPages();
        enquiryConfigmenuactions.clickAllPages();
        checkNextPage(renameVal);
        enquiryConfigElements.enquiryTypeTable()
            .contains('p', renameVal)
            .parent()
            .siblings()
            .children('button')
            .click();

        enquiryConfigElements.renameBtn().click();

        //Renaming the Old Reason Name to New Name
        enquiryConfigElements.dialogBoxNameField().clear();
        enquiryConfigElements.renameTextfield().type(checkname);
        enquiryConfigElements.addEnqSaveBtn().click();
        enquiryConfigmenuactions.clickLoadAllPages();
        enquiryConfigmenuactions.clickAllPages();
        checkNextPage(checkname);
        enquiryConfigElements.enquiryTypeTable().contains('p', checkname);
    });

    it("BDM : Create Enquiry Type and Set Enquiry Status", () => {
        const actualVal = v4();
        const editedVal = actualVal;
        const statusVal = v4();
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
        enquiryConfigmenuactions.clickAddEnqStatus();

        //Actions to be performed inside dialog box
        enquiryConfigElements.dialogBoxNameField().focused().type(statusVal);
        enquiryConfigElements.addEnqSaveBtn().click();

        //wait for the request to the api to get the first page of enquiry close reasons
        cy.wait('@resp').then((r) => {
            const totalItems = body.totalItems;
            // calculate the total number of pages we're going to need
            const pages = Math.floor(totalItems / 10);
            loadAllPages(pages);
        })
        cy.contains(statusVal);


        // access configure enquiries
        configMenuActions.clickEnquiries();

        //Actual Enquiry Type Screen Navigation
        enquiryConfigmenuactions.clickAddNewEnqType();

        //Actions to be performed inside dialog box
        cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(actualVal);
        enquiryConfigElements.addEnqSaveBtn().click();

        //Actions to click Action menu and Edit Button
        enquiryConfigmenuactions.clickLoadAllPages();
        enquiryConfigmenuactions.clickAllPages();
        checkNextPage(editedVal);
        enquiryConfigElements.enquiryTypeTable().contains('p', editedVal)
            .parent()
            .siblings()
            .children('button')
            .click();

        //Action to select Edit Button from Focused Menuitem list.
        cy.focused().siblings().contains('p', "Edit")
            .click();

        //Actions to click Enquiry Status Dropdown box.
         enquiryConfigElements.enquiryTypeStatus()
             .children()
             .children()
             .children()
             .children('button')
             .click()

        //Type and checks the required EnquiryStatus in dropdown box
        cy.focused()
        enquiryConfigElements.enquiryTypeStatus()
            .type('{downarrow}')
            .type('{ctrl}{end}')
            .type(refStatus)

        enquiryConfigElements.checkBox()
            .check().should('be.checked')

        //Remove Added Status from Enquiry
        enquiryConfigElements.enquiryTypeStatus().contains('p', refStatus)
            .get(`[title=${refStatus}]`)
            .get('[data-testid="CancelIcon"]')
            .click();
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

function checkNextPage(text) {
    enquiryConfigElements.enquiryTypeTable().then(($Val) => {
        if ($Val.text().includes(text)) {
            return;
        } else {
            cy.get('button:not([disabled])[title="Go to next page"]')
                .then((e) => {
                    cy.wrap(e).click();
                    return checkNextPage(text);
                });
            }
        });
}