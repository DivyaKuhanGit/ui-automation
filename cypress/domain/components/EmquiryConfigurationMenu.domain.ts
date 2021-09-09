export const elementPaths={
    bdmMenu2: '[data-cy=bdm-configuration-secondary]'
 }

 export const elements = {
    editEnqCloseReason: () => cy.get('[role="button"]').contains('Edit Enquiry Close Reasons'),
    addCloseReason: () => cy.get('[type="button"]').contains('Add Close Reason'),
    enterCloseReason: () => cy.get('input[type = text]'),
    loadMore: () => cy.get('[data-cy="enquiry-close-reasons-load-more-button"]').contains('Load more'),
    closeReasonitems: () => cy.get('[data-cy=enquiry-close-reasons-items]'),
    addCloseReasonSave: () => cy.get('[role="dialog"]').get('[type="submit"]').contains('Save'),
    addCloseReasonCancel: () => cy.get('[data-cy="cancel-button"]'),
    renameTextfield:() => cy.get('[id="name"]'),
    renameCloseReasonSave: () => cy.get('[role=dialog]').get('[data-cy="submit-button"]').contains('Save'),
    renameCloseReasonCancel: () => cy.get('[role=dialog]').get('[data-cy="cancel-button"]').contains('Cancel'),
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

    clickLoadMore() {
        elements.loadMore().click();
        return this;
    },
    verifycloseReasonItemsVisible() {
        elements.closeReasonitems().should('be.visible');
        return actions;
    },

    verifyLoadMoreVisible() {
        elements.loadMore().should('be.visible');
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