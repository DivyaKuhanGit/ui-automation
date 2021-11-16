import { actions as navMenuActions } from "../domain/components/NavigationMenu.domain";
import { actions as tenantSelectActions } from "../domain/components/TenantSelect.domain";
import { actions as bdmSubMenuActions } from "../domain/components/BdmSubmenu.domain";
import { actions as bdmConfigMenuActions } from "../domain/components/EnquiryConfigurationMenu.domain";
import { actions as configMenuActions } from "../domain/components/ConfigurationMenu.domain";
import { elements as enquiryConfigMenuElements } from "../domain/components/EnquiryConfigurationMenu.domain";
import { actions as enquiryConfigMenuActions } from "../domain/components/EnquiryConfigurationMenu.domain";
import { v4 } from "uuid";

describe("Edit Enquiry Status :", () => {
  beforeEach(() => {
    cy.loginTrainingProvider();
    tenantSelectActions.pickTestTenant();
    tenantSelectActions.submitSelection();
    navMenuActions.clickBusinessDevelopmentButton();
    bdmSubMenuActions.clickConfigurationButton();
    configMenuActions.clickEnquiries();
  });

  it("BDM : Add Enquiry Status", () => {
    const status = v4();
    bdmConfigMenuActions.clickEditEnqStatus();
    bdmConfigMenuActions.clickAddEnqStatus();
    cy.focused()
      .get('[role="dialog"]')
      .get('[data-cy="name-field"]')
      .focused()
      .type(status);
    enquiryConfigMenuElements.addEnqSaveBtn().click();
  });

  it("BDM Edit Enquiry Type", () => {
    const actualVal = v4();
    const statusVal = v4();

    // see comment at the bottom of test regarding these
    // const editedVal = actualVal;
    // const refStatus = statusVal;

    // access configure enquiries
    configMenuActions.clickEnquiries();

    //Actions to Add New Enquiry Status
    enquiryConfigMenuActions.clickEditEnqStatus();
    enquiryConfigMenuActions.clickAddEnqStatus();

    //Actions to be performed inside dialog box
    cy.focused()
      .get('[role="dialog"]')
      .get('[data-cy="name-field"]')
      .focused()
      .type(statusVal);
    enquiryConfigMenuElements.addEnqSaveBtn().click();

    // access configure enquiries
    configMenuActions.clickEnquiries();

    //Actual Enquiry Type Screen Navigation
    enquiryConfigMenuActions.clickAddNewEnqType();

    //Actions to be performed inside dialog box
    cy.focused()
      .get('[id="name"]')
      .should("be.enabled")
      .should("be.focused")
      .type(actualVal);
    enquiryConfigMenuElements.addEnqSaveBtn().click();

    // FIXME: the rest of this is not guaranteed as it works only when the new item is on page one
    // disabling until we have a good solution for cycling pages

    // //Actions to click Action menu and Edit Button
    // enquiryConfigMenuElements.enquiryTypeTable()
    //     .contains('p', editedVal)
    //     .parent()
    //     .siblings()
    //     .children('button')
    //     .click()

    // //Action to select Edit Button from Focused Menuitem list.
    // cy
    //     .focused()
    //     .siblings()
    //     .contains('p', "Edit")
    //     .click();

    // //Actions to be performed to add Enquiry Status from Dropdown box.
    // cy.get('[data-cy="enquiry-type-statuses"]')
    //     .children()
    //     .children()
    //     .children()
    //     .children('button')
    //     .click();
    // //Type and checks the required EnquiryStatus
    // cy.focused().get('[data-cy="enquiry-type-statuses"]').type(refStatus)
    // cy.get('[type="checkbox"]').check()
    //     .focused()
    //     .blur();
  });
});
