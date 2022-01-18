export const elements = {
    opportunityTypeTable: () => cy.get('[data-cy="opportunity-types-table"]'),
    opportunityTypeStatus: () => cy.get('[data-cy="opportunity-type-statuses"]'),
    addNewOpportunityTypeBtn: () => cy.get('[data-cy="add-opportunity-type-button"]'),
    loadDropDownPages: () => cy.get('[role="button"]').get('[aria-haspopup="listbox"]'),
    allOpportunityPages: () => cy.get('[data-value="100"]'),
    dialogBoxNameField: () => cy.get('[data-cy="name-field"]'),
    addStatusNameField: () => cy.get('[data-cy="configuration-opportunity-statuses-add-new-name"]'),
    renameAddStatusNameField: () => cy.get('[data-cy="name-field"]'),
    addOpportunitySaveBtn: () => cy.get('[data-cy="submit-button"]'),
    renameBtn: () => cy.get('li[data-cy*="opportunity-type-actions-rename"]'),
    renameTextfield: () => cy.get('[id="name"]'),
    checkBox: () => cy.get('[type="checkbox"]'),
    opportunityStatusItem: () => cy.get('[data-cy="opportnuity-statuses-items"]'),
    editOpportunityStatus: () => cy.get('[data-cy="opportunity-statuses-button"]'),
    addOpportunityStatus: () => cy.get('[data-cy="add-opportunity-status-button"]'),
    addOpportunityType: () => cy.get('[data-cy="add-opportunity-type-button"]'),
    combobox: () => cy.get('[role="combobox"]')
};
export const actions = {
    clickaddNewOpportunityTypeBtn() {
        elements.addNewOpportunityTypeBtn().click();
        return actions;
    },

    clickLoadAllPages() {
        elements.loadDropDownPages().click();
    },

    clickAllPages() {
        elements.allOpportunityPages().click();
        return actions;
    },

    clickEditOpportunityStatus() {
        elements.editOpportunityStatus().click();
        return actions;
    },

    clickAddOpportunityStatus() {
        elements.addOpportunityStatus().click();
        return actions;
    },

    clickAddNewOpportunityType() {
        elements.addOpportunityType().click();
        return actions;
    },
};