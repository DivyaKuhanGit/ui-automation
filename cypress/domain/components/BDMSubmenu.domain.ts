import { collapseTextChangeRangesAcrossMultipleVersions, getDefaultLibFilePath } from "typescript";

export const elements = {
    Enquiries: () => cy.get('[data-cy=side-submenu').contains('Enquiries'),
    Configuration: () => cy.get('[data-cy=side-submenu').contains('Configuration'),
    ConfigEnquiries: () => cy.get('[data-cy=bdm-configuration-secondary').contains('Enquiries'),
    EditEnqCloseReason: () => cy.contains('Edit Enquiry Close Reasons'),
    AddCloseReason: () => cy.contains('Add Close Reason'),
    EnterCloseReason: () => cy.get('input[type = text]').type('')

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
        elements.ConfigEnquiries().click();
        return this;
    },

    clickEditEnqCloseReasonButton() {
        elements.EditEnqCloseReason().click();
        return this;
    },

    clickAddCloseReason() {
        elements.AddCloseReason().click();
        return this;
    },

    verifyAddCloseReasonVisible() {
        elements.AddCloseReason().should('be.visible');
        return this;
    },
    verifyEditEnqCloseReasonVisible() {
        elements.EditEnqCloseReason().should('be.visible');
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
        elements.ConfigEnquiries().should('be.visible');
       return this;
    }
};