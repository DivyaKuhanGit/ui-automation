import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as logInPageActions } from '../domain/components/MSLogInPage.domain';
import {actions as sideSubMenuActions} from '../domain/components/UMSideSubmenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import {elements as tenantSelectelements } from '../domain/components/TenantSelect.domain';
import { contains } from 'cypress/types/jquery';
import { ExitStatus } from 'typescript';
describe('Log in', () => {
  beforeEach(() => {
    //@ts-ignore
    cy.clearCookies({domain:null});
  //  cy.reload(true)
  });

  it('Sidesub Menu1: validate log in/out', () => {
    // sitting on the log out page returns a promise rejection for auth token
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from failing the test
      return false;
    });
    cy.clearCookies()
    cy.visit(Cypress.env('user-management-base'));
    cy.wait(3000);
    //  logInPageActions.logInAsAdmin();
    cy.wait(4000);
      tenantSelectActions.pickTestTenant();
      tenantSelectActions.submitSelection();
      navMenuActions.clickUMButton();
      sideSubMenuActions.UserList();
    //  navMenuActions.logOut();
  });

  it('Sidesub Menu2: validate log in/out', () => {
    // sitting on the log out page returns a promise rejection for auth token
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from failing the test
      return false;
    });
    cy.clearCookies()
    cy.visit(Cypress.env('user-management-base'));
  //    logInPageActions.logInAsAdmin();
      cy.wait(4000);
      tenantSelectActions.pickTestTenant();
      tenantSelectActions.submitSelection();
      navMenuActions.clickUMButton();
      sideSubMenuActions.UserGroup();
    //  navMenuActions.logOut();
  });
});

