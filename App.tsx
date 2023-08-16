import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeNavigator from './src/routers/HomeNavigator';
import TabNavigator from './src/routers/TabNavigator';

const App = () => {
  return (
    <>
      <TabNavigator />
    </>
  );
};

export default App;
