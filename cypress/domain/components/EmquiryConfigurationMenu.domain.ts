export const elementPaths={
    bdmMenu2: '[data-cy=bdm-configuration-secondary]'
 }

 export const elements = {
    editEnqCloseReason: () => cy.get('[role="button"]').contains('Edit Enquiry Close Reasons'),
    addCloseReason: () => cy.get('[type="button"]').contains('Add Close Reason'),
    enterCloseReason: () => cy.get('input[type = text]'),
    loadMore: () => cy.get('[data-cy="enquiry-close-reasons-load-more-button"]').contains('Load more'),
     closeReasonitems: () => cy.get('[data-cy=enquiry-close-reasons-items]').get('ul').children('.MuiListItem-container').children(),
     childReason: () => cy.get('ul').children('.MuiListItem-container')
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
    verifyChildReasonVisible() {
        elements.childReason().children();
        return this;
    },
    verifycloseReasonItemsVisible() {
        elements.closeReasonitems().should('be.visible');
        return this;
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