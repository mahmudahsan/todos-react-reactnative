/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 */

import React from 'react';
import { View } from 'react-native';
import TodoListItem from '../components/TodoListItem';

export default class TodoList extends React.Component {
  render(){
    return (
      <View>
        {
          this.props.data.map((title, index) => (
            <TodoListItem 
              key={index} 
              title={title} 
              startColor={'#1098c2'}
              endColor={'#b7e0ec'}
            />
          ))
        }
      </View>
    )
  }
}