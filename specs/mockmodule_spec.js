let HomePage = require("../pages/angularhomepage.po");

xdescribe("angularjs homepage add mock module", function() {
  let homePage = new HomePage();

  it("should fail this spec", async () => {
    //add mock module which sets $timeout function with 12 seconds delay
    //which should fail spec as protractor waits for $timeout o be resolved
    //within 11 sec by default
    await browser.addMockModule("somemodule", () => {
      angular.module("somemodule", []).run([
        "$timeout",
        $timeout => {
          $timeout(() => {
            console.log("$timeout ended!!!");
          }, 12000);
        }
      ]);
    });

    await homePage.get();
    await homePage.addTodo("my Todo# 0");
    expect(await homePage.todoList.get(2).getText()).toEqual("myTodo# 0");
  });

  it("should pass this spec", async () => {
    //add mock module which sets $timeout function with 10 seconds delay
    //which should pass spec
    await browser.addMockModule("somemodule", () => {
      angular.module("somemodule", []).run([
        "$timeout",
        $timeout => {
          $timeout(() => {
            console.log("$timeout ended!!!");
          }, 10000);
        }
      ]);
    });

    await homePage.get();
    await homePage.addTodo("my Todo# 0");
    expect(await homePage.todoList.get(2).getText()).toEqual("my Todo# 0");
  });
});
