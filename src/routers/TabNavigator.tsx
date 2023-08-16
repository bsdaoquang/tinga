import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeNavigator from './HomeNavigator';
import ExploreNavigator from './ExploreNavigator';
import GroceryNavigator from './GroceryNavigator';
import ProfileNavigator from './ProfileNavigator';

const TabNavigator = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tabs.Screen name="HomeTab" component={HomeNavigator} />
        <Tabs.Screen name="ExploreTab" component={ExploreNavigator} />
        <Tabs.Screen name="GroceryTab" component={GroceryNavigator} />
        <Tabs.Screen name="ProfileTab" component={ProfileNavigator} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
