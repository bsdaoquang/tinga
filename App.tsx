import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeNavigator from './src/routers/HomeNavigator';

const App = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name="HomeTab" component={HomeNavigator} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
