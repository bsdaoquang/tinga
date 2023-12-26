import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  ContactDietitian,
  ContactSupport,
  HomeScreen,
  ListScoreTrend,
  ListScores,
  ProfileScreen,
  ReferralTerms,
  TipDetail,
  TipsScreens,
  VideosScreen,
} from '../screens';
import VideoPlayer from '../screens/homes/components/VideoPlayer';
import MyAddedProducts from '../screens/profiles/MyAddedProducts';
import ListScoreDetail from '../screens/profiles/ListScoreDetail';

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
      <HomeStack.Screen name="VideoPlayer" component={VideoPlayer} />
      <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <HomeStack.Screen name="ListScoreTrend" component={ListScoreTrend} />
      <HomeStack.Screen name="ListScores" component={ListScores} />
      <HomeStack.Screen name="ReferralTerms" component={ReferralTerms} />
      <HomeStack.Screen name="MyAddedProducts" component={MyAddedProducts} />
      <HomeStack.Screen name="ContactDietitian" component={ContactDietitian} />
      <HomeStack.Screen name="ListScoreDetail" component={ListScoreDetail} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
