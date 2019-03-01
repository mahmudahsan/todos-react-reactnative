/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 * 
 * 'DataStorage' class is responsible to save data permanently
*/

import { AsyncStorage } from 'react-native';

export default class DataStorage {
  createData = async (id, dataString) => {
    try {
      await AsyncStorage.setItem(id, dataString); // key, value
    }
    catch(error){ 
      console.log("Error saving data");
    }
  }

  readAllData = (keys) => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, result) => {
          let todoList = [];
          result.map((item) => {
            //item[0] = key | item[1] = value
            const todo = JSON.parse(item[1]);
            todoList.push(todo);
          });
          
          resolve(todoList);
        });
      });
    });
  }
}