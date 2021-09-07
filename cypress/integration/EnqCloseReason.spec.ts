import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSumbenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as bdmConfigMenuActions } from '../domain/components/EmquiryConfigurationMenu.domain';
import { actions as configMenuActions } from '../domain/components/ConfigurationMenu.domain';
import { elements as enquiryConfigmenuElements } from '../domain/components/EmquiryConfigurationMenu.domain';
//import { actions as enquiryConfigActions } from '../domain/components/EmquiryConfigurationMenu.domain';
import { uuid } from 'uuidv4';
const randomVal = uuid();

function findItem(Value) {
    function findInpage(pageDisplay) {
        let found = false
        cy.get('[data-cy=enquiry-close-reasons-load-more-button]').as('loadMore')
        cy.get("@loadMore").then($btn => {
            if($btn.is(":disabled")) {
                return false;
            } else {
                cy.get('@loadMore').click();
                cy.get('[data-cy=enquiry-close-reasons-items]').get('.MuiListItem-container>.MuiListItem-root>.MuiListItemText-root>.MuiTypography-root').get('[title]').each(itemName1 => {
                    const itemText = itemName1.text();
                    //console.log(itemText);
                    if (itemText === Value) {
                        found = true
                        //return false;
                    }
                }).then(() => {
                    if (!found) {
                        findInpage(pageDisplay);
                    }
                });
            }
        })
    } findInpage(0)
}

describe('Edit Enquiry Close Reason:', () => {
    beforeEach(() => {
        cy.loginTrainingProvider();
    });

    //it('BDM : Configuration Enquiries_Add Close Reason', () => {
    //  //                  get to configuration menu

    //  // select test tenant
    //  tenantSelectActions.pickTestTenant();
    //  tenantSelectActions.submitSelection();

    //  // open BDM module
    //  navMenuActions.verifyBuisnessDevelopmentButtonVisible();
    //  navMenuActions.clickBuisnessDevelopmentButton();

    //  // access configuration in bdm
    //  bdmSumbenuActions.verifyConfigurationButtonVisible();
    //  bdmSumbenuActions.clickConfigurationButton();

    //  // access configure enquiries
    //  configMenuActions.clickEnquiries();

    //  // Actual Enquiry Config screen navigation
    //  bdmConfigMenuActions.verifyEditEnqCloseReasonVisible();
    //  bdmConfigMenuActions.clickEditEnqCloseReasonButton();
    //  bdmConfigMenuActions.verifyAddCloseReasonVisible();
    //  bdmConfigMenuActions.clickAddCloseReason();

    //  //Actions to be performed inside dialog box
    //  cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(uuid());
    //  cy.focused().blur();
    //  //Clicks Save button of the dialog box.
    //  cy.get('[role="dialog"]').get('[type="submit"]').contains('Save').click(); 
    //});

    it('BDM : Configuration Enquiries_Add Close Reason', () => {
        //                  get to configuration menu

        // select test tenant
        tenantSelectActions.pickTestTenant();
        tenantSelectActions.submitSelection();

        // open BDM module
        navMenuActions.verifyBuisnessDevelopmentButtonVisible();
        navMenuActions.clickBuisnessDevelopmentButton();

        // access configuration in bdm
        bdmSumbenuActions.verifyConfigurationButtonVisible();
        bdmSumbenuActions.clickConfigurationButton();

        // access configure enquiries
        configMenuActions.clickEnquiries();

        // Actual Enquiry Config screen navigation
        bdmConfigMenuActions.verifyEditEnqCloseReasonVisible();
        bdmConfigMenuActions.clickEditEnqCloseReasonButton();
        bdmConfigMenuActions.verifyAddCloseReasonVisible();
        bdmConfigMenuActions.clickAddCloseReason();

        //Actions to be performed inside dialog box
        cy.focused().get('[id="name"]').should('be.enabled').should('be.focused').type(randomVal);
        cy.focused().blur();
        //Clicks Save button of the dialog box.
        //cy.get('[role="dialog"]').get('[type="submit"]').contains('Save').click();
        //Clicks Cancel Button of the dialog box.
        cy.get('[data-cy="cancel-button"]').click();

        const orignalVal = "46731764-434e-45e6-a7cc-dc02b92540a8";
        findItem(orignalVal);
        if (true) {
            enquiryConfigmenuElements.closeReasonitems()
                .contains('li', orignalVal)
                .find(`button[aria-label*=${orignalVal}]`)
                .click();

            cy.focused().contains('li', 'Rename').click();

            //Renaming the old Reason to New Name
            cy.focused().get('[role=dialog]').get('[id="name"]').clear();
            cy.get('[id="name"]').type('Renamed_' + uuid());
            cy.get('[role=dialog]').get('[data-cy="submit-button"]').contains('Save').click();
            //cy.get('[role=dialog]').get('[data-cy="cancel-button"]').contains('Cancel').click();
        }
        
    //    describe('Recursion and Pagination', () => {
    //        it.skip("Recursion", () => {
    //            function test(index) {
    //                if (index >= 10) {
    //                    return false;
    //                } else {
    //                    console.log(index);
    //                    test(++index);
    //                }
    //            }
    //            test(0);
    //        })
    //});
  });
});


//function findItem(Value) {
//function findInpage(index) {
//    let found = false
//    cy.get('[data-cy=enquiry-close-reasons-load-more-button]:not(.MuiTouchRipple-root)').as('pages')
//    cy.get("@pages").its("length").then(len => {
//        if (index >= len) {
//            return false;
//        } else {
//            cy.get('@pages').eq(index).click();
//            cy.get('[data-cy=enquiry-close-reasons-items]').get('li').each(itemName1 => {
//                const itemText = itemName1.text();
//                console.log(itemText);
//                if (itemText === Value) {
//                    found = true
//                    return false;
//                }
//            }).then(() => {
//                if (!found) {
//                    findInpage(++index);
//                }
//            });
//        }
//    })
//} findInpage(0)
//}