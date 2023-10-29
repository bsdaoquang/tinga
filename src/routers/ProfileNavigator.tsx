import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  ContactDietitian,
  ContactSupport,
  ListScoreTrend,
  ListScores,
  ProfileScreen,
  ReferralTerms,
} from '../screens';
import MyAddedProducts from '../screens/profiles/MyAddedProducts';

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
      <ProfileStack.Screen name="ContactSupport" component={ContactSupport} />
      <ProfileStack.Screen name="ReferralTerms" component={ReferralTerms} />
      <ProfileStack.Screen name="MyAddedProducts" component={MyAddedProducts} />
      <ProfileStack.Screen
        name="ContactDietitian"
        component={ContactDietitian}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
