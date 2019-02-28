/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

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
        />
        <Button
          buttonStyle={{backgroundColor: '#1098c2'}}
          title="ADD"
          onPress={this.onAddPress}  
        />
      </View>
    );
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
    }

  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  }
});

