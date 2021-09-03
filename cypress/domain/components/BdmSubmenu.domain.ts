
export const elementPaths={
    bdmSubmenu: '[data-cy=side-submenu]'
 }

export const elements = {
    enquiries: () => cy.get(elementPaths.bdmSubmenu).contains('Enquiries'),
    accounts: () => cy.get(elementPaths.bdmSubmenu).contains('Accounts'),
    opportunities: () => cy.get(elementPaths.bdmSubmenu).contains('Opportunities'),
    configuration: () => cy.get(elementPaths.bdmSubmenu).contains('Configuration'),
};

export const actions = {
    clickEnquiriesButton() {
        elements.enquiries().click();
        return actions;
    },

    clickAccountsButton() {
        elements.accounts().click();
        return actions;
    },

    clickOpportunitiesButton() {
        elements.opportunities().click();
        return actions;
    },

    clickConfigurationButton() {
        elements.configuration().click();
        return actions;
    },

    verifyEnquiriesButtonVisible() {
        elements.enquiries().should('be.visible');
        return actions;
    },

    verifyAccountsButtonVisible() {
        elements.accounts().should('be.visible');
        return this;
    },

    verifyOpportunitiesButtonVisible() {
        elements.opportunities().should('be.visible');
       return this;
    },

    verifyConfigurationButtonVisible() {
        elements.configuration().should('be.visible');
       return this;
    }
};