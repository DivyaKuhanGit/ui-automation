export const elements = {
  userGroupNameFiled: () => cy.get("#name"),
  userGroupTypeDropdown: () => cy.get("#userType"),
  createNewUserGroupButton: () => cy.get("[data-cy=create-group-button]").parent(),
};

export const actions = {
  clickCreateNewUserGroupButton() {
    elements.createNewUserGroupButton().click();
    return actions;
  },

  typeIntoNameField: (newName: string) => {
    elements.userGroupNameFiled().type(newName);
    return actions;
  },

  selectFromTypeDropDown: (userGroupType: UserGroupType) => {
    elements.userGroupTypeDropdown().click();
    cy.contains("li", userGroupType).click();
    return actions;
  },
};

export enum UserGroupType {
  EMPLOYER = "Employer",
  TRAINING_PROVIDER = "Training Provider",
}
