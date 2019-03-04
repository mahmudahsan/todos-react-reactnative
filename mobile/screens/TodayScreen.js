/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 */

import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import AddTodo from '../components/AddTodo';
import Config, { TODOSTATUS } from '../config/Settings';
import TodoList from '../components/TodoList';
import uuid4 from 'uuid/v4';
import model from '../model/Model';

export default class TodayScreen extends React.Component {
  state = {
    // list of todos object [{id, title, created, status},]
    data: [],
  };
  
  static navigationOptions = {
    title: Config.appTitle,
  };

  componentDidMount(){
    StatusBar.setHidden(false);

    // Retrieving data from disk
    model.readTodoList(TODOSTATUS.active).then((todoList) => {
      const sortedTodoList = todoList.sort((a, b) => {
        return a.created < b.created;
      });
      this.setState({
        data: sortedTodoList
      })

      //console.log(sortedTodoList);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <AddTodo onTodoAdd={this.onTodoAdd} />
        <TodoList 
          data={this.state.data} 
          onTodoUpdate={this.onTodoUpdate}
        />
      </View>
    );
  }

  // Pass this prop to AddTodo
  onTodoAdd = (text) => {
    const todoItem = {
      id: uuid4(),
      title: text,
      created: Date.now(),
      status: TODOSTATUS.active
    }
    //console.log(todoItem);
    this.setState((prevState) => ({
      data: [todoItem, ...prevState.data]
    }), () => {
        // Call Model to save data permanently
        model.createTodo(todoItem);
      }
    ); 
  };

  // Pass this prop to TodoList
  onTodoUpdate = (indexOfTodoItem) => {
    //console.log("on todo update: " + indexOfTodoItem);
    //modify data 
    let allData = [...this.state.data];
    allData[indexOfTodoItem].status = TODOSTATUS.done;
    this.setState({
      data: allData.filter(todo=>(todo.status === TODOSTATUS.active))
    }, ()=> {
      // update data permanently
      model.updateTodo(allData[indexOfTodoItem], TODOSTATUS.done);
    })
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 5,
    marginBottom: 30,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});