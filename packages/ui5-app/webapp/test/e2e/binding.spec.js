describe("binding", function () {

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

    it("Other view: PeopleList: items aggregation", function () {
        element(
            by.control({
                viewName: "test.Sample.view.Main",
                id: "NavButton"
            })
        ).click();

        const list = element(
            by.control({
                viewName: "test.Sample.view.Other",
                id: "PeopleList",
                aggregationFilled: [{ name: "items" }]
            })
        );

        expect(list.asControl().getProperty("headerText")).toMatch(/bites the dust/);
    });

    it("amount of items", function () {
        const listItems = element.all(
            by.control({
                viewName: "test.Sample.view.Other",
                controlType: "sap.m.StandardListItem"
            })
        );
        expect(listItems.count()).toBeGreaterThan(2);
    });
});
