/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 * 
 * 'DataStorage' class is responsible to save data permanently
*/

import { AsyncStorage } from 'react-native';
import { TODOSTATUS } from '../config/Settings';

export default class DataStorage {
  createData = async (id, dataString) => {
    try {
      await AsyncStorage.setItem(id, dataString); // key, value
    }
    catch(error){ 
      console.log("Error saving data");
    }
  };

  readAllData = (filter) => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, result) => {
          let todoList = [];
          
          result.map((item) => {
            //item[0] = key | item[1] = value
            const todo = JSON.parse(item[1]);
            
            if (filter !== undefined && todo.status === filter){
              //based on filter
              todoList.push(todo);
            }
            
            if (filter === undefined ) {
              // any
              todoList.push(todo);
            }
          });
          resolve(todoList);
        });
      });
    });
  };
}