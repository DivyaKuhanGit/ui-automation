 export const elements = {

    editEnqCloseReason: () => cy.get('[data-cy=enquiry-close-reasons-button]'),
    addCloseReason: () => cy.get('[type="button"]').contains('Add Close Reason'),
    enterCloseReason: () => cy.get('input[type = text]'),
    loadMore: () => cy.get('[data-cy="enquiry-close-reasons-load-more-button"]').contains('Load more'),
    closeReasonItems: () => cy.get('[data-cy=enquiry-close-reasons-items]'),
    addCloseReasonSave: () => cy.get('[role="dialog"]').get('[type="submit"]').contains('Save'),
    addCloseReasonCancel: () => cy.get('[data-cy="cancel-button"]'),
    renameTextField:() => cy.get('[id="name"]'),
    renameCloseReasonSave: () => cy.get('[role=dialog]').get('[data-cy="submit-button"]').contains('Save'),
    renameCloseReasonCancel: () => cy.get('[role=dialog]').get('[data-cy="cancel-button"]').contains('Cancel'),
    editEnqStatus: () => cy.get('[data-cy="enquiry-statuses-button"]').contains('Edit Enquiry Statuses'),
    addEnqStatus: () => cy.get('[data-cy="add-enquiry-status-button"]'),
    enqStatusItems: () => cy.get('[data-cy="enquiry-statuses-items"]'),
    addEnqSaveBtn: () => cy.get('[data-cy="submit-button"]').contains('Save'),
    addEnqCancelBtn: () => cy.get('[data-cy="cancel-button"]').contains('Cancel'),
    addNewEnqTypeBtn: () => cy.get('[data-cy="add-enquiry-type-button"]'),
    enqTypeStatus: () => cy.get('[data-cy="enquiry-type-statuses"]'),
    enquiryTypeTable: () => cy.get('[data-cy=enquiry-types-table]'),
    enquiryTypeStatus: () => cy.get('[data-cy= "enquiry-type-statuses"]'),
    enquiryStatusItem: () => cy.get('[data-cy="enquiry-statuses-items"]'),
    loadDropDownPages: () => cy.get('[role="button"]').get('[aria-haspopup="listbox"]'),
    allPages: () => cy.get('[data-value="100"]'),
    rightArrow: () => cy.get('[data-testid="KeyboardArrowRightIcon"]'),
    dialogBoxNameField: () => cy.get('[role = "dialog"]').get('[data-cy="name-field"]'),
    renameBtn: () => cy.get('li[data-cy*="rename-button"]'),
    checkBox: () => cy.get('[type="checkbox"]')
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

    clickEditEnqStatus() {
        elements.editEnqStatus().click();
        return this;
    },

    clickAddEnqStatus() {
        elements.addEnqStatus().click();
        return actions;
    },

    clickAddNewEnqType() {
        elements.addNewEnqTypeBtn().click();
        return actions;
    },
    clickLoadAllPages() {
        elements.loadDropDownPages().click();
        return actions;
    },
    clickAllPages() {
        elements.allPages().click();
        return actions;
    },
    verifyCloseReasonItemsVisible() {
        elements.closeReasonItems().should('be.visible');
        return actions;
    },
    clickRightArrow() {
        elements.rightArrow().click();
        return actions;
    },

    verifyLoadMoreVisible() {
        elements.loadMore().should('be.visible');
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