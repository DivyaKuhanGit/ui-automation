import { actions as logInPageActions } from '../domain/components/MSLogInPage.domain';
import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSumbenuActions } from '../domain/components/BDMSubmenu.domain';
import { retryTillHappy } from '../utils/wait.util';
import { uuid } from 'uuidv4';

describe('Edit Enquiry Close Reason:', () => {
  beforeEach(() => {
    cy.sshLogin();
  });

  it('BDM : Configuration Enquiries_Add Close Reason', () => {
    tenantSelectActions.pickTestTenant();
    tenantSelectActions.submitSelection();
    navMenuActions.verifyBuisnessDevelopmentButtonVisible();
    navMenuActions.clickBuisnessDevelopmentButton();
    bdmSumbenuActions.verifyConfigButtonVisible();
    bdmSumbenuActions.clickConfigButton();
    retryTillHappy(bdmSumbenuActions.verifyConfigEnqButtonVisible);
    bdmSumbenuActions.clickConfigEnqButton();
    bdmSumbenuActions.verifyEditEnqCloseReasonVisible();
    bdmSumbenuActions.clickEditEnqCloseReasonButton();
    bdmSumbenuActions.verifyAddCloseReasonVisible();
    bdmSumbenuActions.clickAddCloseReason();
    //Actions to be performed inside dialog box
    cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(uuid());
    cy.focused().blur();
    cy.get('[role="dialog"]').get('[type="submit"]').contains('Save').click(); //Clicks Save button of the dialog box.
  });
});
