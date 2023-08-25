import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ImproveScore, ProductDetail, ShopingHistory} from '../screens';
import TabNavigator from './TabNavigator';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
      }}>
      <Stack.Screen name="HomeRoot" component={TabNavigator} />
      <Stack.Screen name="ShopingHistory" component={ShopingHistory} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="ImproveScore" component={ImproveScore} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
