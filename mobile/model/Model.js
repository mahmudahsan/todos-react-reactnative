/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 * This Model is a high level class to save data
 * We can change the saving mechanism based on situation
 * This 'Model' class is designed as Singleton Pattern
 */

import DataStorage from './DataStorage';

class Model { 
  constructor(){
    if (!Model.instance){
      this.dataStorage = new DataStorage();
      Model.instance = this;
    }
    return Model.instance;
  }

  createTodo = (todo) => {
    console.log("Create Todo");
    console.log(todo);

    const todoString = JSON.stringify(todo);
    this.dataStorage.createData(todo.id, todoString);
  }

  readTodoList = () => {
    console.log("Reading Todo");
    return this.dataStorage.readAllData(); // promise obj return
  }

  updateTodo = (todo) => {
    console.log("Update Todo");
    console.log(todo);
  }

  deleteTodo = (todo) => {
    console.log("Delete Todo");
    console.log(todo);
  }
}

const instance = Object.freeze(new Model());
export default instance;