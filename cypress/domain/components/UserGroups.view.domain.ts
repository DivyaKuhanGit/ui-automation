import { findTableElementByContainingText } from '../../utils/selector.util';

export const elements = {
  searchBox: () => cy.get('[aria-autocomplete="list"]'),
  createNewGroupButton: () => cy.contains('Create new group'),
  groupTable: () => cy.get('[class="MuiTableBody-root"]'),
  nextPage: () => cy.get('.MuiTablePagination-actions > [tabindex="0"]')
};

export enum GroupItemMenuActions {
  RENAME = 'Rename group',
  DELETE_GROUP = 'Delete group',
  PERMISSIONS = 'Group permissions',
  USERS = 'Group users'
}

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
