export const elementPaths={
    bdmMenu2: '[data-cy=bdm-configuration-secondary]'
 }

 export const elements = {
    editEnqCloseReason: () => cy.get('[role="button"]').contains('Edit Enquiry Close Reasons'),
    addCloseReason: () => cy.get('[type="button"]').contains('Add Close Reason'),
    enterCloseReason: () => cy.get('input[type = text]')
};

export const actions = {
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
    }
};