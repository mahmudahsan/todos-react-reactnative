/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 */

import React from 'react';
import { Stylesheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

export default class AddTodo extends React.Component {
  render(){
    return (
      <View>
        <Input 
          placeholder="Type new todo"
          leftIcon={{type: 'font-awesome', name: 'plus'}}
        />
      </View>
    );
  }
}

