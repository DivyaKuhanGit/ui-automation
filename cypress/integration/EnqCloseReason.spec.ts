import { actions as logInPageActions } from '../domain/components/MSLogInPage.domain';
import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as BDMSubmenu } from '../domain/components/BDMSubmenu.domain';
import { retryTillHappy } from '../utils/wait.util';
import { uniqueId } from 'cypress/types/lodash';

describe('Edit Enquiry Close Reason:', () => {

    const uniqueSeed = Date.now().toString();
    const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
    const uniquiID = getUniqueId();

    beforeEach('', () => {
        cy.visit(Cypress.env('user-management-base'));
        retryTillHappy(Cypress.env('user-management-base').visible);
    });

    it('BDM : Configuration Enquiries', () => {
        retryTillHappy(logInPageActions.verifyOnLogInPage);
        logInPageActions.logInAsAdmin();
        retryTillHappy(navMenuActions.verifyLogOutButtonVisible);

        tenantSelectActions.pickTestTenant();
        tenantSelectActions.submitSelection();
        navMenuActions.verifyBuisnessDevelopmentButtonVisible();
        navMenuActions.clickBuisnessDevelopmentButton();
        BDMSubmenu.verifyconfigButtonVisible();
        BDMSubmenu.clickConfigButton();
        retryTillHappy(BDMSubmenu.verifyconfigEnqButtonVisible);
        BDMSubmenu.clickConfigEnqButton();
        BDMSubmenu.verifyEditEnqCloseReasonVisible();
        BDMSubmenu.clickEditEnqCRButton();
        BDMSubmenu.verifyAddCloseReasonVisible();
        BDMSubmenu.clickAddCloseReason();
        cy.focused()
            .should('have.class', 'MuiInputBase-input MuiFilledInput-input MuiInputBase-inputMarginDense MuiFilledInput-inputMarginDense')
        //cy.contains('yourval')
            .should('be.focused').type(uniquiID)
        cy.focused().blur();
        cy.get('[type="submit"]').contains('Save').click();
    });
});
