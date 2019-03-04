/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 */

import React from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Config from '../config/Settings';

export default class AddTodo extends React.Component {
  state = {
    inputText: ""
  }

  render(){
    return (
      <View style={styles.container}>
        <Input
          containerStyle = {{flex: 1}}
          placeholder = "Type new todo"
          leftIcon = {{type: 'font-awesome', name: 'plus', size: 20}}
          leftIconContainerStyle = {{paddingRight: 10}}
          onChangeText={(text)=> this.setState({inputText: text})}
          value={this.state.inputText}
          returnKeyType="done"
          onSubmitEditing={this.onEnterPress}
        />
        <Button
          buttonStyle={{backgroundColor: Config.themeButtonColor}}
          title="ADD"
          onPress={this.onAddPress}  
        />
      </View>
    );
  }

  // Enter press
  onEnterPress = (event) => {
    this.onAddPress();
  }

  // Add Button
  onAddPress = () => {
    // Checking empty string
    const cleanString = this.state.inputText.trim();

    if (cleanString.length == 0){
     // console.log("Empty String");
    }
    else{
      // Add in database
      this.setState({inputText: ""});
      this.props.onTodoAdd(cleanString);
      Keyboard.dismiss();
    }

  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  }
});

