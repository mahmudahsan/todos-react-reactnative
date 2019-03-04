/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 * https://github.com/mastermoo/react-native-action-button
 * https://github.com/oblador/react-native-vector-icons
 */

import React from 'react';
import { Alert, View, StyleSheet, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Config, { TODOSTATUS } from '../config/Settings';
import model from '../model/Model';


export default class ArchivedScreen extends React.Component {
  state = {
    data: [],
  };

  static navigationOptions = {
    title: Config.appTitle,
  };

  componentDidMount(){
    this.props.navigation.addListener('willFocus', (route) => { 
      // Retrieving data from disk
      model.readTodoList(TODOSTATUS.done).then((todoList) => {
        const sortedTodoList = todoList.sort((a, b) => {
          return a.created < b.created;
        });
        this.setState({
          data: sortedTodoList
        })
      });  
    });
  }

  _keyExtractor = (item) => item.id

  _renderItem = ({item, index}) => {
    const date = new Date(item.created);
    return (
      <ListItem
        title={item.title}
        subtitle={date.toDateString()}
        subtitleStyle={styles.subtitleItalic}
        style={styles.row}
        containerStyle={{backgroundColor: "#c1c1c1"}}
      />
    )
  };

  _renderTrashButtonIcon = () => (
    <View>
      <Icon name="trash" size={30} color="white" />
    </View>
  );

  _onClearArchive = () => {
    Alert.alert(
      'Clear Archived',
      'Do you want to clear all the past todos?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes', 
          style: 'destructive',
          onPress: () => {
            model.deleteArchivedTodoList()
            .then(()=>{
              this.setState({
                data: []
              })
            })
            .catch((err) => {
              console.log(err);
            });
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        { this.state.data.length > 0 && <ActionButton
          buttonColor="rgba(231,76,60,1)"
          renderIcon={this._renderTrashButtonIcon}
          onPress={this._onClearArchive}
        /> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  row: {
    borderWidth : 1, 
    borderColor : "#DDDDDD",
  },
  subtitleItalic: {
    fontStyle: "italic", 
    textAlign: "right",
    fontSize: 12,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});