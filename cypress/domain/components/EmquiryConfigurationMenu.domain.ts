export const elementPaths={
    bdmMenu2: '[data-cy=bdm-configuration-secondary]'
 }

 export const elements = {
    editEnqCloseReason: () => cy.get('[role="button"]').contains('Edit Enquiry Close Reasons'),
    addCloseReason: () => cy.get('[type="button"]').contains('Add Close Reason'),
    enterCloseReason: () => cy.get('input[type = text]'),
    loadMore: () => cy.get('[data-cy="enquiry-close-reasons-load-more-button"]').contains('Load more'),
    closeReasonitems: () => cy.get('[data-cy=enquiry-close-reasons-items]')
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
        return actions;
    },
    
    verifyEditEnqCloseReasonVisible() {
        elements.editEnqCloseReason().should('be.visible');
        return actions;
    }
};