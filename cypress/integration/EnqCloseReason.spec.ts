import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSumbenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as bdmConfigMenuActions } from '../domain/components/EmquiryConfigurationMenu.domain';
import { actions as configMenuActions } from '../domain/components/ConfigurationMenu.domain';
import { elements as enquiryConfigmenuElements } from '../domain/components/EmquiryConfigurationMenu.domain';
//import { actions as enquiryConfigActions } from '../domain/components/EmquiryConfigurationMenu.domain';
import { uuid } from 'uuidv4';
import { hasData } from 'cypress/types/jquery';
const randomVal = uuid();
const enqItemList = '[data-cy=enquiry-close-reasons-items]';
const orignalVal = randomVal;

describe('Edit Enquiry Close Reason:', () => {
    beforeEach(() => {
        cy.loginTrainingProvider();
    });

    it('BDM : Add Close Reason', () => {
      // get to configuration menu

      // select test tenant
      tenantSelectActions.pickTestTenant();
      tenantSelectActions.submitSelection();

      // open BDM module
      navMenuActions.verifyBuisnessDevelopmentButtonVisible();
      navMenuActions.clickBuisnessDevelopmentButton();

      // access configuration in bdm
      bdmSumbenuActions.verifyConfigurationButtonVisible();
      bdmSumbenuActions.clickConfigurationButton();

      // access configure enquiries
      configMenuActions.clickEnquiries();

      // Actual Enquiry Config screen navigation
      bdmConfigMenuActions.verifyEditEnqCloseReasonVisible();
      bdmConfigMenuActions.clickEditEnqCloseReasonButton();
      bdmConfigMenuActions.verifyAddCloseReasonVisible();
      bdmConfigMenuActions.clickAddCloseReason();

      //Actions to be performed inside dialog box
      cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(uuid());
      cy.focused().blur();
      //Clicks Save button of the dialog box.
      enquiryConfigmenuElements.addCloseReasonSave().click();
    });

    it('BDM : Rename Enqiury Close Reason', () => {
        let body: object = {};
        cy.intercept('/business-development/enquiry-close-reasons?page=0', (request) => {
            request.continue((response) => {
                body = response.body;
            });
        }).as('resp');
        //                  get to configuration menu

        // select test tenant
        tenantSelectActions.pickTestTenant();
        tenantSelectActions.submitSelection();

        // open BDM module
        navMenuActions.verifyBuisnessDevelopmentButtonVisible();
        navMenuActions.clickBuisnessDevelopmentButton();
            
        // access configuration in bdm
        bdmSumbenuActions.verifyConfigurationButtonVisible();
        bdmSumbenuActions.clickConfigurationButton();

        // access configure enquiries
        configMenuActions.clickEnquiries();

        // Actual Enquiry Config screen navigation
        bdmConfigMenuActions.verifyEditEnqCloseReasonVisible();
        bdmConfigMenuActions.clickEditEnqCloseReasonButton();
        bdmConfigMenuActions.verifyAddCloseReasonVisible();
        bdmConfigMenuActions.clickAddCloseReason();

        //Actions to be performed inside dialog box
        cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(randomVal);
        cy.focused().blur();
        enquiryConfigmenuElements.addCloseReasonSave().click();  //Clicks Save button of the dialog box.
        //enquiryConfigmenuElements.addCloseReasonCancel().click();  //Clicks Cancel Button of the dialog box.

        function loadAllPages(pages, level = 0) {
            if (level > 20 || pages > 20) {
                throw 'Exceeded recursion depth';
            }
            if (level >= pages) {
                return;
            }
            return (
                cy.get('button:not([disabled])[data-cy=enquiry-close-reasons-load-more-button]')                // thankfully cypress doesn't require that we scroll this element in to view first, it
                    .then((e) => {                                                                         // appears to do that automatically
                cy.wrap(e).click();
                return loadAllPages(pages, level + 1);// recusion, boooooo                        
                })// this gets significantly slower on each iteration so is not an ideal solution
            );
        }

        cy.wait('@resp') // wait for the request to the api to get the first page of enquiry close reasons
        .then((r) => {
        const totalItems = body.totalItems;
        const pages = Math.floor(totalItems / 10); // calculate the total number of pages we're going to need
        loadAllPages(pages);
        // now that all the pages are loaded, check that the element we just added is present
        cy.get(enqItemList).contains(orignalVal);
        (enquiryConfigmenuElements.closeReasonitems().get('[title]')).each((Title) => {
        const item = Title.text();
            if (item.match(orignalVal)) {             
            enquiryConfigmenuElements.closeReasonitems()
            .contains('li', orignalVal)
            .find(`button[aria-label*=${orignalVal}]`)
            .click();
            cy.focused().contains('li', 'Rename').click();

            //Renaming the Old Reason Name to New Name
            cy.focused().get('[role=dialog]').get('[id="name"]').clear();
            enquiryConfigmenuElements.renameTextfield().type('Renamed-' + uuid()); //Types New Name
            enquiryConfigmenuElements.renameCloseReasonSave().click();    //Renamed Successfully.
            //enquiryConfigmenuElements.renameCloseReasonCancel().click();  //Click Cancel if needed.
            }
            });
        });
  });
});
