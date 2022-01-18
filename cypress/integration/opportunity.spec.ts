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

    it("BDM Add New Opportunity Type", () => {
        const randomVal = v4();
        const orignalType = randomVal;

        // access configure enquiries
        configMenuActions.clickOpportunities();

        //Actual Enquiry Type Screen Navigation
        opportunityConfigmenuActions.clickaddNewOpportunityTypeBtn();

        //Actions to be performed inside dialog box
        cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(randomVal);
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
        opportunityConfigElements.addOpportunitySaveBtn().click();

        //Actions to be performed to find and rename the added value.
        opportunityConfigmenuActions.clickLoadAllPages();
        opportunityConfigmenuActions.clickAllPages();
        checkNextPage(renameVal);
        opportunityConfigElements.opportunityTypeTable()
            .contains('p', renameVal)
            .parent()
            .siblings()
            .children('button')
            .click();

        opportunityConfigElements.renameBtn().focused().click();

        //Renaming the Old Reason Name to New Name
        opportunityConfigElements.renameAddStatusNameField().clear();
        opportunityConfigElements.renameTextfield().type(checkname);
        opportunityConfigElements.addOpportunitySaveBtn().click();
        opportunityConfigmenuActions.clickLoadAllPages();
        opportunityConfigmenuActions.clickAllPages();
        opportunityConfigElements.opportunityTypeTable().contains('p', checkname);
    });

    it("BDM : Create Opportunity Type and Set Opportunity Status", () => {
        const actualVal = v4();
        const editedVal = actualVal;
        const statusVal = v4();
        const refStatus = statusVal;

        //Actions to get response after loading all pages
        let body: object;
        cy.intercept('/business-development/opportunity-statuses?page=0', (request) => {
            request.continue((response) => {
                body = response.body;
            });
        }).as('resp');

        // access configure enquiries
        configMenuActions.clickOpportunities();

        //Actions to Add New Enquiry Status
        opportunityConfigmenuActions.clickEditOpportunityStatus();
        opportunityConfigmenuActions.clickAddOpportunityStatus();

        //Actions to be performed inside dialog box
        opportunityConfigElements.addStatusNameField().focused().type(statusVal);
        opportunityConfigElements.addOpportunitySaveBtn().click();

        //wait for the request to the api to get the first page of enquiry close reasons
        cy.wait('@resp').then((r) => {
            const totalItems = body.totalItems;
            // calculate the total number of pages we're going to need
            const pages = Math.floor(totalItems / 10);
            loadAllPages(pages);
        })
        cy.contains(statusVal);

        // access configure enquiries
        configMenuActions.clickOpportunities();

        //Actual Enquiry Type Screen Navigation
        opportunityConfigmenuActions.clickaddNewOpportunityTypeBtn();

        //Actions to be performed inside dialog box
        cy.get('[id="name"]').should('be.enabled').should('be.focused').type(actualVal);
        opportunityConfigElements.addOpportunitySaveBtn().click();

        //Actions to click Action menu and Edit Button
        opportunityConfigmenuActions.clickLoadAllPages();
        opportunityConfigmenuActions.clickAllPages();
        checkNextPage(editedVal);
        opportunityConfigElements.opportunityTypeTable()
            .contains('p', editedVal)
            .parent()
            .siblings()
            .children('button')
            .click();

        //Action to select Edit Button from Focused Menuitem list.
        cy.focused().siblings().contains('p', "Edit")
            .click();

        //Actions to click Enquiry Status Dropdown box.
        opportunityConfigElements.opportunityTypeStatus()
            .children()
            .children()
            .children()
            .children('button')
            .click()

        //Type and checks the required EnquiryStatus in dropdown box
        cy.focused()
            .type('{downarrow}')
            .type('{ctrl}{end}')
            .type(refStatus)

        opportunityConfigElements.checkBox()
            .check().should('be.checked')

        //Remove Added Status from Enquiry
        opportunityConfigElements.combobox().contains('p', refStatus)
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
        .get('button:not([disabled])[data-cy=opportnuity-statuses-load-more-button]')
        .then((e) => {
            cy.wrap(e).click();
            return loadAllPages(pages, level + 1);
        });
}
function checkNextPage(text) {
    opportunityConfigElements.opportunityTypeTable().then(($Val) => {
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
