export const elements = {
    accountForm: () => cy.get('[data-cy="configure-account-forms-select-form"]'),
    clearBtn: () => cy.get('[title="Clear"]'),
    useForm: () => cy.get('[data-cy="use-form-button"]'),
    addAccountForm: () => cy.get('[data-cy="add-form"]'),
    addFormName: () => cy.get('[data-cy="name"]'),
    title: () => cy.get('[data-cy="title"]'),
    description: () => cy.get('[data-cy="description"]'),
    designerTab: () => cy.get('[type="button"]').contains('Designer'),
    previewTab: () => cy.get('[type="button"]').contains('Preview'),
    addGroup: () => cy.get('[type="button"]').contains('Add group'),
    customType: () => cy.get('[role="dialog"]').contains("Type"),
    dropDown: () => cy.get('[role="button"]').get('[aria-haspopup="listbox"]'),
    saveBtn: () => cy.get('[data-cy="submit-button"]'),
    cancelBtn: () => cy.get('[data-cy="cancel-button"]'),
    addCustomField: () => cy.get('[type="button"]').contains('Add custom field'),
    maxLength: () => cy.get('[id="maxLength"]')
};