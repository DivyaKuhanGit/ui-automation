export const elements = {
  newAccountNameField: () => cy.get("#name"),
  newAccountModalSubmit: () => cy.get("[data-cy=submit-button]"),
  newAccountModalCancel: () => cy.get("[data-cy=cancel-button]"),
};

export const actions = {
  typeNewAccountName: (value: string) => {
    elements.newAccountNameField().type(value);
    return actions;
  },

  submitModal: () => {
    elements.newAccountModalSubmit().click();
    return actions;
  },

  cancelModal: () => {
    elements.newAccountModalCancel().click();
    return actions;
  },
};
