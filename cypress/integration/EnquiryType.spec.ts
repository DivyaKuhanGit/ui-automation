import { actions as navMenuActions } from '../domain/components/NavigationMenu.domain';
import { actions as tenantSelectActions } from '../domain/components/TenantSelect.domain';
import { actions as bdmSubMenuActions } from '../domain/components/BdmSubmenu.domain';
import { actions as configMenuActions } from '../domain/components/ConfigurationMenu.domain';
import { actions as enquiryConfigMenuActions } from '../domain/components/EnquiryConfigurationMenu.domain';
import { elements as enquiryConfigElements } from '../domain/components/EnquiryConfigurationMenu.domain';
import { loadAllPages } from '../utils/morePageLoader.util';


describe("Enquiry Type : ", () => {
    beforeEach(() => {
        cy.loginTrainingProvider();
        // select test tenant
        tenantSelectActions.pickTestTenant();
        tenantSelectActions.submitSelection();

        // open BDM module
        navMenuActions.clickBusinessDevelopmentButton();

        // access configuration in bdm
        bdmSubMenuActions.clickConfigurationButton();
    });

    it("BDM : Create Enquiry Type and Set Enquiry Status", () => {
        const actualVal = "028f17a3-1908-4181-90ff-756fcfba3589";
        const editedVal = actualVal;
        const statusVal = "8356e2a6-eec1-4560-b221-342ded020125";
        const refStatus = statusVal;

        //Actions to get response after loading all pages
        let body: object;
        cy.intercept('/business-development/enquiry-status?page=0', (request) => {
            request.continue((response) => {
                body = response.body;
            });
        }).as('resp');

        // access configure enquiries
        configMenuActions.clickEnquiries();

        //Actions to Add New Enquiry Status
        enquiryConfigMenuActions.clickEditEnqStatus();

        // wait for the request to the api to get the first page of enquiry close reasons
        cy.wait('@resp').then(() => {
            const totalItems = body.totalItems;
            // calculate the total number of pages we're going to need
            const pages = Math.floor(totalItems / 10);
            loadAllPages(pages);
        })

        enquiryConfigElements.enquiryStatusItem().contains(statusVal);

        // access configure enquiries
        configMenuActions.clickEnquiries();

        //Actions to click Action menu and Edit Button
        enquiryConfigMenuActions.clickLoadAllPages();
        enquiryConfigMenuActions.clickAllPages();
        enquiryConfigElements.enquiryTypeTable()
            .contains('p', editedVal)
            .parent()
            .siblings()
            .children('button')
            .click();

        //Action to select Edit Button from Focused Menuitem list.
        cy.focused().siblings().contains('p', "Edit")
            .click();

        //Actions to click Enquiry Status Dropdown box.
         enquiryConfigElements.enquiryTypeStatus()
             .children()
             .children()
             .children()
             .children('button')
             .click()

        //Type and checks the required EnquiryStatus in dropdown box
        cy.focused()
        enquiryConfigElements.enquiryTypeStatus()
            .type('{downarrow}')
            .type('{ctrl}{end}')
            .type(refStatus)
            

        enquiryConfigElements.checkBox()
            .check().should('be.checked')
    });
});
