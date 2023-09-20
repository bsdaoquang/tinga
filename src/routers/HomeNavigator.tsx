import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  ContactDietitian,
  ContactSupport,
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
      <HomeStack.Screen name="ContactSupport" component={ContactSupport} />
      <HomeStack.Screen name="ContactDietitian" component={ContactDietitian} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
