import { clickLiByEnumValue } from '../../utils/selector.util';

export const elements = {
  userGroupNameFiled: () => cy.get('#name'),
  userGroupTypeDropdown: () => cy.get('#userType'),
  createNewUserGroupButton: () => cy.get('.MuiButton-label > .MuiTypography-root')
};

export const actions = {
  clickCreateNewUserGroupButton() {
    elements.createNewUserGroupButton().click();
    return actions;
  },

  typyIntoNameField: (newName: string) => {
    elements.userGroupNameFiled().type(newName);
    return actions;
  },

  selectFromTypeDropDown: (userGroupType: UserGroupType) => {
    elements.userGroupTypeDropdown().click();
    const listLink = () => cy.get('.MuiPaper-root > .MuiList-root');

    clickLiByEnumValue(listLink, userGroupType);

    return actions;
  }
};

export enum UserGroupType {
  EMPLOYER = 'Employer',
  TRAINING_PROVIDER = 'Training Provider'
}
