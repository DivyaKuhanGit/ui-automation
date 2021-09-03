import { findTableElementByContainingText } from '../../utils/selector.util';

export const elements = {
  createNewGroupButton: () => cy.contains('Create new group'),
  groupTable: () => cy.get('[class="MuiTableBody-root"]'),
  nextPage: () => cy.get('.MuiTablePagination-actions > [tabindex="0"]')
};

export const actions = {
  clickCreateGroup() {
    elements.createNewGroupButton().click();
    return actions;
  },

  getGroupByName(name: string) {
    console.log('starting to search');
    do {
      try {
        return findTableElementByContainingText(elements.groupTable, name);
      } catch (e) {
        actions.clickNextPage();
      }
    } while (actions.isNextPageAvailable());
    return undefined;
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
