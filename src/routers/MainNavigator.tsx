import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  ImproveScore,
  ProductDetail,
  ReferralScreen,
  ShopingHistory,
  WebviewScreen,
} from '../screens';
import TabNavigator from './TabNavigator';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeRoot" component={TabNavigator} />
      <Stack.Screen name="ShopingHistory" component={ShopingHistory} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="ImproveScore" component={ImproveScore} />
      <Stack.Screen name="ReferralScreen" component={ReferralScreen} />
      <Stack.Screen name="WebviewScreen" component={WebviewScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
