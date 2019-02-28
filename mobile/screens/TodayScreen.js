/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 */

import React from 'react';
import { View, Text } from 'react-native';
import Config from '../config/Settings';

export default class TodayScreen extends React.Component {
  static navigationOptions = {
    title: Config.appTitle,
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Today</Text>
      </View>
    );
  }
}