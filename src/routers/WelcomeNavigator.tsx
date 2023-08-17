import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LoginScreen, Welcome} from '../screens';

const WelcomeNavigator = () => {
  const WelcomeStack = createNativeStackNavigator();
  return (
    <WelcomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <WelcomeStack.Screen name="WelcomeScreen" component={Welcome} />
      <WelcomeStack.Screen name="LoginScreen" component={LoginScreen} />
    </WelcomeStack.Navigator>
  );
};

export default WelcomeNavigator;
