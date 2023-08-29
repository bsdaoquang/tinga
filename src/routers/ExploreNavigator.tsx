import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {CategoryDetail, ExploreScreen} from '../screens';

const ExploreNavigator = () => {
  const ExploreStack = createNativeStackNavigator();
  return (
    <>
      <ExploreStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <ExploreStack.Screen name="ExploreScreen" component={ExploreScreen} />
        <ExploreStack.Screen name="CategoryDetail" component={CategoryDetail} />
      </ExploreStack.Navigator>
    </>
  );
};

export default ExploreNavigator;
