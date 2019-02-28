/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 */

 import { 
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer 
} from 'react-navigation';

import TodayScreen from './screens/TodayScreen';
import ArchivedScreen from './screens/ArchivedScreen';

// Stack Navigation
const TodayStack = createStackNavigator({
  Today: TodayScreen,
})

const ArchivedStack = createStackNavigator({
  Archived: ArchivedScreen
})

// Tab Navigation
const TabNavigator = createBottomTabNavigator({
  Today: TodayStack,
  Archived: ArchivedStack,
});

export default createAppContainer(TabNavigator);