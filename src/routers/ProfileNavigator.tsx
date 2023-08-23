import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ListScoreTrend, ListScores, ProfileScreen} from '../screens';

const ProfileNavigator = () => {
  const ProfileStack = createNativeStackNavigator();
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="ListScoreTrend" component={ListScoreTrend} />
      <ProfileStack.Screen name="ListScores" component={ListScores} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
