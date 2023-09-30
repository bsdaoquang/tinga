import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  BarCodeScreen,
  HomeScan,
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
      {/* <Stack.Screen name="HomeScan" component={HomeScan} />
      <Stack.Screen name="BarCodeScreen" component={BarCodeScreen} /> */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
