import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSumbenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as bdmConfigMenuActions } from '../domain/components/EmquiryConfigurationMenu.domain';
import { actions as configMenuActions } from '../domain/components/ConfigurationMenu.domain';
import { elements as enquiryConfigmenuElements } from '../domain/components/EmquiryConfigurationMenu.domain';
import { uuid } from 'uuidv4';
const randomVal = uuid();
const orignalVal = randomVal;
const enqStatusItems = '[data-cy="enquiry-statuses-items"]';

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
        cy.focused().get('[role="dialog"]').get('[data-cy="name-field"]').focused().type(uuid());
        cy.focused().blur();
        //Clicks Save button of the dialog box.
        enquiryConfigmenuElements.addEnqSavebtn().click();
    });

    it('BDM : Rename Enquiry Status', () => {
        let body: object = {};
        cy.intercept('/business-development/enquiry-status?page=0', (request) => {
            request.continue((response) => {
                body = response.body;
            });
        }).as('resp');

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
        //bdmConfigMenuActions.clickAddEnqStatus();

        //Actions to be performed inside dialog box
        cy.focused().get('[role="dialog"]').get('[data-cy="name-field"]').focused().type(uuid());
        cy.focused().blur();
        //Clicks Save button of the dialog box.
        enquiryConfigmenuElements.addEnqSavebtn().click();

        // wait for the request to the api to get the first page of enquiry close reasons
        cy.wait('@resp').then((r) => {
            const totalItems = body.totalItems;
            // calculate the total number of pages we're going to need
            const pages = Math.floor(totalItems / 10);
            loadAllPages(pages);
        });

        // All Pages Loaded, check that the element we just added is present
        cy.get(enqStatusItems)
            .contains('p', orignalVal)
            .parent()
            .parent()
            .parent()
            .parent()
            .siblings()
            .click();

        cy.get('li[data-cy*="rename-button"]').focused().click();

        //Renaming the Old Reason Name to New Name
        cy.focused().get('[role=dialog]').get('[data-cy="name-field"]').clear();
        enquiryConfigmenuElements.renameTextfield().type('Renamed-' + uuid());
        enquiryConfigmenuElements.renameCloseReasonSave().click();
    });
});