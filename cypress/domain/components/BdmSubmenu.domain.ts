
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
        return this;
    },

    clickAccountsButton() {
        elements.accounts().click();
        return this;
    },

    clickOpportunitiesButton() {
        elements.opportunities().click();
        return this;
    },

    clickConfigurationButton() {
        elements.configuration().click();
        return this;
    },

    verifyEnquiriesButtonVisible() {
        elements.enquiries().should('be.visible');
        return this;
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