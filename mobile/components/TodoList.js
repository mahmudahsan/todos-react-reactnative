/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 */

import React from 'react';
import { View, FlatList } from 'react-native';
import TodoListItem from '../components/TodoListItem';

export default class TodoList extends React.Component {
  _keyExtractor = (item) => item.id

  rgbToHex = (rgb) => { 
    var hex = (Number(rgb) % 255).toString(16);

    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
  };

  fullColorHex = (r,g,b) => {   
    var red   = this.rgbToHex(r);
    var green = this.rgbToHex(g);
    var blue  = this.rgbToHex(b);
    return red+green+blue; // 1098c2 : 6 digit
  };

  _renderItem = ({item, index}) => {
    /**
     * Start Color to Target Color
     * 1098c2 : R 16, G 152, B 194
       a8dae9 : R 168, G 218, B 233
       Increase rate = 5
       R: 16/255*100  = 6.27  | 6.27/100 * 5 = 0.3135 
       G: 152/218*100 = 59.6  | 59.6/100 * 5 = 2.98
       B: 194/233*100 = 76.0  | 76.0/100 * 5 = 7.6
     */
    const r = Math.floor(0.3135 * index);
    const g = Math.floor(2.98 * index);
    const b = Math.floor(3.8 * index);
    let startColor = this.fullColorHex(Number(16+r), Number(152+g), Number(194+b));
    
    return (
      <TodoListItem 
        todo={item} 
        startColor={`#${startColor}`}
        endColor={'#e0ecf0'}
        onItemPress={()=>{this.onTodoItemPressed(index)}}
      />
    )
  };

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
    this.startColor = this.props.startColor;
  }
}