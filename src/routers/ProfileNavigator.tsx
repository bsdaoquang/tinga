import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ProfileScreen} from '../screens';

const ProfileNavigator = () => {
  const ProfileStack = createNativeStackNavigator();
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
