let HomePage = require('./homepage.po');

describe('angularjs homepage todo list', function () {

    let homePage = new HomePage();

    beforeAll( async () => {
      await homePage.get();

      for (let i = 0; i < 8; i++)
      {
       await homePage.addTodo("myTodo# " + i);
      }

    });

    it('should add todo', async () => {      
      expect(await homePage.todoList.count()).toEqual(10);
      expect(await homePage.todoList.get(2).getText()).toEqual('myTodo# 0');
    });

    it('should cross todo', async () => {
      await homePage.crossOffListByNames(["myTodo# 2", "myTodo# 4", "myTodo# 7"]);
      expect(await homePage.completedAmount.count()).toEqual(4);
    });
  });