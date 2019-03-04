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
    const todoString = JSON.stringify(todo);
    this.dataStorage.createData(todo.id, todoString);
  };

  readTodoList = (filter) => {
    return this.dataStorage.readAllData(filter); // promise obj return
  };

  updateTodo = (todo, status) => {
    todo.status = status; 
    const todoString = JSON.stringify(todo);
    // replacing original task
    this.dataStorage.createData(todo.id, todoString);
  };

  deleteArchivedTodoList = () => {
    return this.dataStorage.deleteAllArchivedTodoList();
  };
}

const instance = Object.freeze(new Model());
export default instance;