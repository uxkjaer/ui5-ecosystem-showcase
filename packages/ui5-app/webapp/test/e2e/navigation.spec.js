const mainPageObject = require("./pages/main.view");
const otherPageObject = require("./pages/other.view");

describe("navigation", function () {

    afterEach(() => {
        browser.executeScript(`$.ajax({ 
            type: "POST",
            url: 'http://localhost:3000/coverage/client',
            data: JSON.stringify(window.__coverage__),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
          });`);
    });
    it("should see the initial page of the app", function () {
        Given.iStartMyApp();
        Then.onTheMainPage.iShouldSeeTheApp();
    });

    it("should navigate to the list page and back", function () {
        When.onTheMainPage.iPressTheNavButton();
        Then.onTheOtherPage.iShouldSeeTheList();

        When.onTheOtherPage.iNavigateBack();
        Then.onTheMainPage.iShouldSeeTheNavButton();
    });
});
