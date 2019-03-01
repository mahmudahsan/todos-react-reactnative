/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
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

  constructor(props){
    super(props);
  }

  componentDidMount(){
    model.readTodoList().then((todoList) => {
      const sortedTodoList = todoList.sort((a, b) => {
        return a.created < b.created;
      });
      this.setState({
        data: sortedTodoList
      })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <AddTodo onTodoAdd={this.onTodoAdd} />
        <TodoList data={this.state.data} />
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
    }),
      () => {
        // Call Model to save data permanently
        model.createTodo(todoItem);
      }
    ); 
  };
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    margin: 2,
    marginTop: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});