import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSubMenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as bdmConfigMenuActions } from '../domain/components/EnquiryConfigurationMenu.domain';
import { actions as configMenuActions } from '../domain/components/ConfigurationMenu.domain';
import { elements as enquiryConfigMenuElements } from '../domain/components/EnquiryConfigurationMenu.domain';
import { v4 as uuid} from 'uuid';
import { GenericTotalItemsResponse, loadAllPages } from '../utils/morePageLoader.util';

const randomVal = uuid();
const enqItemList = '[data-cy=enquiry-close-reasons-items]';
const originalVal = randomVal;


describe('Edit Enquiry Close Reason:', () => {
    beforeEach(() => {
        cy.loginTrainingProvider();
    });

    it('BDM : Configuration Enquiries_Add Close Reason', () => {
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
        bdmConfigMenuActions.clickEditEnqCloseReasonButton();
        bdmConfigMenuActions.clickAddCloseReason();

        //Actions to be performed inside dialog box
        cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(uuid());
        cy.focused().blur();
        enquiryConfigMenuElements.addCloseReasonSave().click();
    });

    it('BDM : Rename Enqiury Close Reason', () => {
        let body:GenericTotalItemsResponse;
        cy.intercept('/business-development/enquiry-close-reasons?page=0', (request) => {
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
        bdmConfigMenuActions.clickEditEnqCloseReasonButton();
        bdmConfigMenuActions.clickAddCloseReason();

        //Actions to be performed inside dialog box
        cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(randomVal);
        cy.focused().blur();
        enquiryConfigMenuElements.addCloseReasonSave().click();

        // wait for the request to the api to get the first page of enquiry close reasons
        cy.wait('@resp').then((r) => {
            const totalItems = body.totalItems;
            // calculate the total number of pages we're going to need
            const pages = Math.floor(totalItems / 10);
            loadAllPages(pages);
        });

        // All Pages Loaded, check that the element we just added is present
        cy.get(enqItemList)
            .contains('p', originalVal)
            .parent()
            .parent()
            .parent()
            .parent()
            .siblings()
            .click();

        enquiryConfigMenuElements.renameBtn().focused().click();

        //Renaming the Old Reason Name to New Name
        enquiryConfigMenuElements.dialogBoxNameField().clear();
        enquiryConfigMenuElements.renameTextField().type('Renamed-' + uuid());
        enquiryConfigMenuElements.renameCloseReasonSave().click();
    });
});