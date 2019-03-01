/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 */

import React from 'react';
import { View, FlatList, Text } from 'react-native';
import TodoListItem from '../components/TodoListItem';
import { TODOSTATUS } from '../config/Settings';

export default class TodoList extends React.Component {

  _keyExtractor = (item) => item.id

  _renderItem = ({item, index}) => (
    <TodoListItem 
      todo={item} 
      startColor={'#1098c2'}
      endColor={'#b7e0ec'}
      onItemPress={()=>{this.onTodoItemPressed(index)}}
    />
  )

  render(){
    return (
      <View>
        <FlatList 
          data={this.props.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }

  // When user pressed todo item
  onTodoItemPressed = (indexOfTodoItem) => {
    this.props.onTodoUpdate(indexOfTodoItem);
  }
}