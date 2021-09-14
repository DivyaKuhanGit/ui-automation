import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSumbenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as bdmConfigMenuActions } from '../domain/components/EmquiryConfigurationMenu.domain';
import { actions as configMenuActions } from '../domain/components/ConfigurationMenu.domain';
import { elements as enquiryConfigmenuElements } from '../domain/components/EmquiryConfigurationMenu.domain';
import { uuid } from 'uuidv4';
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
    navMenuActions.clickBuisnessDevelopmentButton();

    // access configuration in bdm
    bdmSumbenuActions.clickConfigurationButton();

    // access configure enquiries
    configMenuActions.clickEnquiries();

    // Actual Enquiry Config screen navigation
    bdmConfigMenuActions.clickEditEnqCloseReasonButton();
    bdmConfigMenuActions.clickAddCloseReason();

    //Actions to be performed inside dialog box
    cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(uuid());
    cy.focused().blur();
    //Clicks Save button of the dialog box.
    enquiryConfigmenuElements.addCloseReasonSave().click();
  });

  it.only('BDM : Rename Enqiury Close Reason', () => {
    let body: object = {};
    cy.intercept('/business-development/enquiry-close-reasons?page=0', (request) => {
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
    bdmConfigMenuActions.clickEditEnqCloseReasonButton();
    bdmConfigMenuActions.clickAddCloseReason();

    //Actions to be performed inside dialog box
    cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(randomVal);
    cy.focused().blur();
    enquiryConfigmenuElements.addCloseReasonSave().click();

    // wait for the request to the api to get the first page of enquiry close reasons
    cy.wait('@resp').then((r) => {
      const totalItems = body.totalItems;
      // calculate the total number of pages we're going to need
      const pages = Math.floor(totalItems / 10);
      loadAllPages(pages);
    });

    // All Pages Loaded, check that the element we just added is present
    cy.get(enqItemList)
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

function loadAllPages(pages, level = 0) {
  if (level > 30 || pages > 30) {
    throw 'Exceeded recursion depth';
  }
  if (level >= pages) {
    return;
  }
  return cy
    .get('button:not([disabled])[data-cy=enquiry-close-reasons-load-more-button]')
    .then((e) => {
      cy.wrap(e).click();
      return loadAllPages(pages, level + 1);
    });
}
