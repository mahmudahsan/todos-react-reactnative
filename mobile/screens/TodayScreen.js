/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Config from '../config/Settings';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

export default class TodayScreen extends React.Component {
  state = {
    // list of todos
    data: [],
  }
  
  static navigationOptions = {
    title: Config.appTitle,
  };

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
    // console.log(text);

    this.setState((prevState) => ({
      data: [text, ...prevState.data]
    })); 
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