/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 */

 import { 
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer 
} from 'react-navigation';

import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import TodayScreen from './screens/TodayScreen';
import ArchivedScreen from './screens/ArchivedScreen';
import Config from './config/Settings';

// Stack Navigation
const TodayStack = createStackNavigator({
  Today: TodayScreen,
})

const ArchivedStack = createStackNavigator({
  Archived: ArchivedScreen
})

// https://snack.expo.io/@react-navigation/tabs-with-icons-v3
const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Today') {
    iconName = `md-checkbox${focused ? '' : '-outline'}`;
  } else if (routeName === 'Archived') {
    iconName = `ios-archive${focused ? '' : ''}`;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

// Tab Navigation
const TabNavigator = createBottomTabNavigator({
  Today: TodayStack,
  Archived: ArchivedStack,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) =>
      getTabBarIcon(navigation, focused, tintColor),
  }),
  tabBarOptions: {
    activeTintColor: Config.themeButtonColor,
    inactiveTintColor: 'gray',
  },
});

export default createAppContainer(TabNavigator);