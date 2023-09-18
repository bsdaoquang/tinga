import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  HomeScan,
  HomeScreen,
  TipDetail,
  TipsScreens,
  VideosScreen,
} from '../screens';

const HomeNavigator = () => {
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="VideosScreen" component={VideosScreen} />
      <HomeStack.Screen name="TipsScreens" component={TipsScreens} />
      <HomeStack.Screen name="TipDetail" component={TipDetail} />
      {/* <HomeStack.Screen name="HomeScan" component={HomeScan} /> */}
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
