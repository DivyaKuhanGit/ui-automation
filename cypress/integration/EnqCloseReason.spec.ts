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
    const scrollableSelector =
      '[style="height: 100%; display: flex;"] > .MuiGrid-direction-xs-column';

    let notDone: boolean = true;
    let found: boolean;
    let foundCy: JQuery<HTMLElement>;
    do {
      cy.log('in do while loop');

      let found = isElementThere(enqItemList, testValueText);

      if (!found) {
        cy.get(scrollableSelector).scrollTo('bottom');
        cy.wait(500);

        if (isButtonClickable(loadMoreSelector)) {
          cy.log(`CLINCKING LOAD MORE`);
          cy.get(loadMoreSelector).click();
        } else {
          cy.log('Button not clickable!!!!');
          found = false;
          notDone = false;
        }
      }
    } while (notDone && !found);

    cy.log(`got out of loop`);
    if (found) {
      console.log(`Found!!!! ${foundCy.text()}`);
    }
  });
});

function isButtonClickable(selector: string): boolean {
  let isEnabled: boolean;
  cy.get(selector).then(($btn) => {
    isEnabled = !$btn.is(':disabled');
    cy.log('inside is enabled');
  });
  cy.log('Just before exit from is enabled');
  return isEnabled;
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
