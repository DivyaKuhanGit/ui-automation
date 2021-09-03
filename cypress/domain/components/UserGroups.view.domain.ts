import { findTableElementByContainingText } from '../../utils/selector.util';

export const elements = {
  createNewGroupButton: () => cy.contains('Create new group'),
  groupList: () => cy.get('[class="MuiTableBody-root"]'),
  nextPage: () => cy.get('.MuiTablePagination-actions > [tabindex="0"]')
};

export const actions = {
  clickCreateGroup() {
    elements.createNewGroupButton().click();
    return this;
  },

  getGroupByName(name: string) {
    console.log('starting to search');
    do {
      try {
        return findTableElementByContainingText(elements.groupList, name);
        //return elements.groupList().find(name);
      } catch (e) {
        actions.clickNextPage();
      }
    } while (actions.isNextPageAvailable());
  },

  isNextPageAvailable(): boolean {
    elements.nextPage().then((x) => {
      return !x.is('enabled');
    });
    return false;
  },

  clickNextPage() {
    elements.nextPage().then((x) => {
      x.click();
    });
  }
};
