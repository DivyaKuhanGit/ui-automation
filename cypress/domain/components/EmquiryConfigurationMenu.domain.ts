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
        return actions;
    },

    clickAddCloseReason() {
        elements.addCloseReason().click();
        return actions;
    },

    verifyAddCloseReasonVisible() {
        elements.addCloseReason().should('be.visible');
        return actions;
    },
    
    verifyEditEnqCloseReasonVisible() {
        elements.editEnqCloseReason().should('be.visible');
        return actions;
    }
};