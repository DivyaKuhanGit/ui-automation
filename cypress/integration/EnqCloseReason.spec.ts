import { actions as navMenuActions, elements } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSumbenuActions } from '../domain/components/BdmSubmenu.domain';
import {actions as bdmConfigMenuActions} from '../domain/components/EmquiryConfigurationMenu.domain'
import { actions as configMenuActions } from '../domain/components/ConfigurationMenu.domain'
import { actions as enquiryConfigmenuActions } from '../domain/components/EmquiryConfigurationMenu.domain'
import { uuid } from 'uuidv4';
export function clickLiByEnumValue(cyGetElement: Function, enumStringValue: string) {
    let elementNotFound = true;
    cyGetElement()
        .find('li')
        .each(($el: { text: () => string; click: () => void; }) => {
            if ($el.text() === enumStringValue.trim()) {
                elementNotFound = false;
                $el.click();
            }
        })
        .then(() => {
            if (elementNotFound) {
                throw new Error(`Failed to find <li> element with value "${enumStringValue}"`);
            }
        });
}

describe('Edit Enquiry Close Reason:', () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
  });

  //it('BDM : Configuration Enquiries_Add Close Reason', () => {
  //  //                  get to configuration menu

  //  // select test tenant
  //  tenantSelectActions.pickTestTenant();
  //  tenantSelectActions.submitSelection();

  //  // open BDM module
  //  navMenuActions.verifyBuisnessDevelopmentButtonVisible();
  //  navMenuActions.clickBuisnessDevelopmentButton();

  //  // access configuration in bdm
  //  bdmSumbenuActions.verifyConfigurationButtonVisible();
  //  bdmSumbenuActions.clickConfigurationButton();

  //  // access configure enquiries
  //  configMenuActions.clickEnquiries();
    
  //  // Actual Enquiry Config screen navigation
  //  bdmConfigMenuActions.verifyEditEnqCloseReasonVisible();
  //  bdmConfigMenuActions.clickEditEnqCloseReasonButton();
  //  bdmConfigMenuActions.verifyAddCloseReasonVisible();
  //  bdmConfigMenuActions.clickAddCloseReason();

  //  //Actions to be performed inside dialog box
  //  cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(uuid());
  //  cy.focused().blur();
  //  //Clicks Save button of the dialog box.
  //  cy.get('[role="dialog"]').get('[type="submit"]').contains('Save').click(); 
  //});

  it('BDM : Configuration Enquiries_Add Close Reason', () => {
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
    cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(uuid());
    cy.focused().blur();
    //Clicks Save button of the dialog box.
    //cy.get('[role="dialog"]').get('[type="submit"]').contains('Save').click(); 
    cy.get('[data-cy="cancel-button"]').click();

      const orignalVal = "06871df0-35e5-4086-aeae-c75e1a42a22c";
      enquiryConfigmenuActions.verifycloseReasonItemsVisible().contains('li, MuiListItem-container').children('.MuiListItemSecondaryAction-root').find()
  });
});