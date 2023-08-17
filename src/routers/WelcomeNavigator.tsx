import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Welcome} from '../screens';

const WelcomeNavigator = () => {
  const WelcomeStack = createNativeStackNavigator();
  return (
    <WelcomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <WelcomeStack.Screen name="WelcomeScreen" component={Welcome} />
    </WelcomeStack.Navigator>
  );
};

export default WelcomeNavigator;
