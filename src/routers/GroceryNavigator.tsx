import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {GroceryScreen} from '../screens';

const GroceryNavigator = () => {
  const GroceryStack = createNativeStackNavigator();
  return (
    <GroceryStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <GroceryStack.Screen name="GroceryScreen" component={GroceryScreen} />
    </GroceryStack.Navigator>
  );
};

export default GroceryNavigator;
