export const elements = {
    opportunityTypeTable: () => cy.get('[data-cy="opportunity-types-table"]'),
    addNewOpportunityTypeBtn: () => cy.get('[data-cy="add-opportunity-type-button"]'),
    loadDropDownPages: () => cy.get('[role="button"]').get('[aria-haspopup="listbox"]'),
    allOpportunityPages: () => cy.get('[data-value="100"]'),
    dialogBoxNameField: () => cy.get('[role = "dialog"]').get('[data-cy="name-field"]'),
    addOpportunitySaveBtn: () => cy.get('[data-cy="submit-button"]').contains('Save'),
    renameBtn: () => cy.get('li[data-cy*="rename-button"]'),
    renameTextfield: () => cy.get('[id="name"]'),
    checkBox: () => cy.get('[type="checkbox"]').not('disabled')
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
};