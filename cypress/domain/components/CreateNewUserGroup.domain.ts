import { clickLiByEnumValue } from '../../utils/selector.util';

export const elements = {
  userGroupNameFiled: () => cy.get('#name'),
  userGroupTypeDropdown: () => cy.get('#userType'),
  createNewUserGroupButton: () => cy.get('.MuiButton-label > .MuiTypography-root')
};

export const actions = {
  clickCreateNewUserGroupButton() {
    elements.createNewUserGroupButton().click();
    return this;
  },

  typyIntoNameField: (newName: string) => {
    elements.userGroupNameFiled().type(newName);
    return this;
  },

  selectFromTypeDropDown: (userGroupType: UserGroupType) => {
    elements.userGroupTypeDropdown().click();
    const listLink = () => cy.get('.MuiPaper-root > .MuiList-root');

    clickLiByEnumValue(listLink, userGroupType);

    return this;
  }
};

export enum UserGroupType {
  EMPLOYER = 'Employer',
  TRAINING_PROVIDER = 'Training Provider'
}
