export const elements = {
  createNewGroupButton: () => cy.contains('Create new group')
};

export const actions = {
  clickCreateGroup() {
    elements.createNewGroupButton().click();
    return this;
  }
};
