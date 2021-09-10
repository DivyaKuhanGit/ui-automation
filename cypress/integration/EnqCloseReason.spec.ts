import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSumbenuActions } from '../domain/components/BdmSubmenu.domain';
import {actions as bdmConfigMenuActions} from '../domain/components/EmquiryConfigurationMenu.domain'
import {actions as configMenuActions} from '../domain/components/ConfigurationMenu.domain'
import { v4 } from 'uuid';

describe('Edit Enquiry Close Reason:', () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
  });

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
    cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(v4());
    cy.focused().blur();
    //Clicks Save button of the dialog box.
    cy.get('[role="dialog"]').get('[type="submit"]').contains('Save').click(); 
  });
});
