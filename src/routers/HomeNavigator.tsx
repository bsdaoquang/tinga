import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  BarCodeScreen,
  ContactDietitian,
  ContactSupport,
  HomeScreen,
  TipDetail,
  TipsScreens,
  VerifyEmail,
  VideosScreen,
} from '../screens';
import VideoPlayer from '../screens/homes/components/VideoPlayer';

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
      <HomeStack.Screen name="VideoPlayer" component={VideoPlayer} />
      <HomeStack.Screen name="BarCodeScreen" component={BarCodeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
