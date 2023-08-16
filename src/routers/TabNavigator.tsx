import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeNavigator from './HomeNavigator';
import ExploreNavigator from './ExploreNavigator';
import GroceryNavigator from './GroceryNavigator';
import ProfileNavigator from './ProfileNavigator';
import {appColors} from '../constants/appColors';

const TabNavigator = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            elevation: 6,
            borderTopWidth: 0,
            backgroundColor: appColors.white,
          },
        }}>
        <Tabs.Screen name="Home" component={HomeNavigator} />
        <Tabs.Screen name="Explore" component={ExploreNavigator} />
        <Tabs.Screen name="Grocery" component={GroceryNavigator} />
        <Tabs.Screen name="Profile" component={ProfileNavigator} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
