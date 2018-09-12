"use strict";

class HomePage { 

    get todoList() { return element.all(by.repeater('todo in todoList.todos')); }

    get completedAmount() {return  element.all(by.css('.done-true')); }

    async get() {
      await browser.get('https://angularjs.org'); 
    }

    async addTodo(str) {
        await element(by.model('todoList.todoText')).sendKeys(str);
        await $('[value="add"]').click();
    }

    async crossOffListByNames(names){
        if (!(names instanceof Array) || names.length < 1) {
            fail("crossOffListByNames(). First argument must be not empty string array");
        }

        for (let name of names) {
            let itemByName = await this.getToDoItemByName(name);
            await itemByName.click();
        };

    }

    async getToDoItemByName(name){
        let listOfItems =  await this.getToDoItemsByName(name);
        return listOfItems[0].$('span');
    }

    async getToDoItemsByName(name){
        let filteredItems = 
            await this.todoList.
                filter( async (elem) => {
                    let elemtext = await elem.$('span').getText();
                    return elemtext.includes(name);
                });             
        return filteredItems;
    }
}
module.exports = HomePage;