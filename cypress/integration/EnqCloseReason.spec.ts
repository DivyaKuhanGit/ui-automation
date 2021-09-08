import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSumbenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as bdmConfigMenuActions } from '../domain/components/EmquiryConfigurationMenu.domain';
import { actions as configMenuActions } from '../domain/components/ConfigurationMenu.domain';

describe('Edit Enquiry Close Reason:', () => {
  beforeEach(() => {
    cy.loginTrainingProvider();

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
  });

  it('BDM : Configuration Enquiries_Add Close Reason', () => {
    //cy.get('[data-cy=enquiry-close-reasons-load-more-button]').as('loadMore');
    let testValueText = '1ff47060-7f12-43b9-b68c-98129989468b';

    let body: object = {};
    cy.intercept('/business-development/enquiry-close-reasons?page=0', (request) => {
      request.continue((response) => {
        body = response.body;
      });
    }).as('resp');
    // Actual Enquiry Config screen navigation
    bdmConfigMenuActions.verifyEditEnqCloseReasonVisible();
    bdmConfigMenuActions.clickEditEnqCloseReasonButton();
    // bdmConfigMenuActions.verifyAddCloseReasonVisible();
    // bdmConfigMenuActions.clickAddCloseReason();

    // //Actions to be performed inside dialog box
    // cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(testValueText);
    // cy.focused().blur();
    // //Clicks Save button of the dialog box.
    // cy.get('[role="dialog"]').get('[type="submit"]').contains('Save').click();

    const loadMoreSelector = '[data-cy=enquiry-close-reasons-load-more-button]';
    const enqItemList = '[data-cy=enquiry-close-reasons-items]';

    // the idea for this comes from https://stackoverflow.com/questions/67583714/cypress-how-to-scroll-a-dropdown-to-find-item
    function loadAllPages(pages, level = 0) {
      if (level > 20 || pages > 20) {
        throw 'Exceeded recursion depth';
      }

      if (level >= pages) {
        return;
      }

      return (
        cy
          // thankfully cypress doesn't require that we scroll this element in to view first, it
          // appears to do that automatically
          .get('button:not([disabled])[data-cy=enquiry-close-reasons-load-more-button]')
          .then((e) => {
            cy.wrap(e).click();

            // recusion, boooooo
            // this gets significantly slower on each iteration so is not an ideal solution
            return loadAllPages(pages, level + 1);
          })
      );
    }

    cy.wait('@resp') // wait for the request to the api to get the first page of enquiry close reasons
      .then((r) => {
        const totalItems = body.totalItems;
        const pages = Math.floor(totalItems / 10); // calculate the total number of pages we're going to need
        loadAllPages(pages);

        // now that all the pages are loaded, check that the element we just added is present
        cy.get(enqItemList).contains(testValueText);
      });
  });
});

function isButtonClickable(selector: string) {
  return cy.get(selector).then(($btn) => {
    let isEnabled = !$btn.prop('disabled');
    return isEnabled;
  });
}

function isElementThere(listSelector: string, containingText: String): boolean {
  cy.get(listSelector)
    .find('li')
    .each(($el) => {
      if ($el.text() === containingText.trim()) {
        return true;
      }
    });

  return false;
}
