import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AddNewProduct, GroceryScreen} from '../screens';

const GroceryNavigator = () => {
  const GroceryStack = createNativeStackNavigator();
  return (
    <GroceryStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <GroceryStack.Screen name="GroceryScreen" component={GroceryScreen} />
      {/* <GroceryStack.Screen name="AddNewProduct" component={AddNewProduct} /> */}
    </GroceryStack.Navigator>
  );
};

export default GroceryNavigator;
