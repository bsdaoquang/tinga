import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ExploreScreen} from '../screens';

const ExploreNavigator = () => {
  const ExploreStack = createNativeStackNavigator();
  return (
    <>
      <ExploreStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <ExploreStack.Screen name="ExploreScreen" component={ExploreScreen} />
      </ExploreStack.Navigator>
    </>
  );
};

export default ExploreNavigator;
