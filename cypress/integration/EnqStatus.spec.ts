import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSubMenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as bdmConfigMenuActions } from '../domain/components/EnquiryConfigurationMenu.domain';
import { actions as configMenuActions } from '../domain/components/ConfigurationMenu.domain';
import { elements as enquiryConfigMenuElements } from '../domain/components/EnquiryConfigurationMenu.domain';
import { v4 as uuid } from 'uuid';
import { loadAllPages } from '../utils/morePageLoader.util';

const randomVal = uuid();
const originalStatus = randomVal;
const enqStatusItems = '[data-cy="enquiry-statuses-items"]';

describe('Edit Enquiry Status :', () => {
    beforeEach(() => {
        cy.loginTrainingProvider();
    });

    it('BDM : Add Enquiry Status', () => {
        // select test tenant
        tenantSelectActions.pickTestTenant();
        tenantSelectActions.submitSelection();

        // open BDM module
        navMenuActions.clickBusinessDevelopmentButton();

        // access configuration in bdm
        bdmSubMenuActions.clickConfigurationButton();

        // access configure enquiries
        configMenuActions.clickEnquiries();

        // Actual Enquiry Config screen navigation
        bdmConfigMenuActions.clickEditEnqStatus();
        bdmConfigMenuActions.clickAddEnqStatus();

        //Actions to be performed inside dialog box
        cy.focused().get('[role="dialog"]').get('[data-cy="name-field"]').focused().type(uuid());
        cy.focused().blur();
        enquiryConfigMenuElements.addEnqSaveBtn().click();
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
        navMenuActions.clickBusinessDevelopmentButton();

        // access configuration in bdm
        bdmSubMenuActions.clickConfigurationButton();

        // access configure enquiries
        configMenuActions.clickEnquiries();

        // Actual Enquiry Config screen navigation
        bdmConfigMenuActions.clickEditEnqStatus();
        bdmConfigMenuActions.clickAddEnqStatus();

        //Actions to be performed inside dialog box
        cy.focused().get('[role="dialog"]').get('[data-cy="name-field"]').focused().type(randomVal);
        cy.focused().blur();
        enquiryConfigMenuElements.addEnqSaveBtn().click();

        // wait for the request to the api to get the first page of enquiry close reasons
        cy.wait('@resp').then((r) => {
            const totalItems = body.totalItems;
            // calculate the total number of pages we're going to need
            const pages = Math.floor(totalItems / 10);
            loadAllPages(pages);
        });

        // All Pages Loaded, check that the element we just added is present
        cy.get(enqStatusItems)
            .contains('p', originalStatus)
            .parent()
            .parent()
            .parent()
            .parent()
            .siblings()
            .click();

        cy.get('li[data-cy*="rename-button"]').focused().click();

        //Renaming the Old Reason Name to New Name
        cy.get('[role=dialog]').get('[data-cy="name-field"]').clear();
        enquiryConfigMenuElements.renameTextField().type('Renamed-' + uuid());
        enquiryConfigMenuElements.renameCloseReasonSave().click();
    });
});