import { collapseTextChangeRangesAcrossMultipleVersions, getDefaultLibFilePath } from "typescript";

export const elements = {
    Enquiries: () => cy.get('[data-cy=side-submenu').contains('Enquiries'),
    Configuration: () => cy.get('[data-cy=side-submenu').contains('Configuration'),
    configEnquiries: () => cy.get('[data-cy=bdm-configuration-secondary').contains('Enquiries'),
    editEnqCloseReason: () => cy.get('[role="button"]').contains('Edit Enquiry Close Reasons'),
    addCloseReason: () => cy.get('[type="button"]').contains('Add Close Reason'),
    enterCloseReason: () => cy.get('input[type = text]').type('')

};

export const actions = {
    clickEnqButton() {
        elements.Enquiries().click();
        return this;
    },

    clickConfigButton() {
        elements.Configuration().click();
        return this;
    },

    clickConfigEnqButton() {
        elements.configEnquiries().click();
        return this;
    },

    clickEditEnqCloseReasonButton() {
        elements.editEnqCloseReason().click();
        return this;
    },

    clickAddCloseReason() {
        elements.addCloseReason().click();
        return this;
    },

    verifyAddCloseReasonVisible() {
        elements.addCloseReason().should('be.visible');
        return this;
    },
    verifyEditEnqCloseReasonVisible() {
        elements.editEnqCloseReason().should('be.visible');
        return this;
    },

    verifyEnqButtonVisible() {
        elements.Enquiries().should('be.visible');
        return this;
    },

    verifyConfigButtonVisible() {
        elements.Configuration().should('be.visible');
        return this;
    },

    verifyConfigEnqButtonVisible() {
        elements.configEnquiries().should('be.visible');
       return this;
    }
};