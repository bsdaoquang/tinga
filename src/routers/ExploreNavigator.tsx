import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {CategoryDetail, ExploreScreen} from '../screens';
import SubCategories from '../screens/explores/SubCategories';
import SubSubCategories from '../screens/explores/SubSubCategories';
import SearchGrocery from '../screens/explores/SearchGrocery';

const ExploreNavigator = () => {
  const ExploreStack = createNativeStackNavigator();

  return (
    <>
      <ExploreStack.Navigator
        initialRouteName="ExploreScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <ExploreStack.Screen name="ExploreScreen" component={ExploreScreen} />
        <ExploreStack.Screen name="CategoryDetail" component={CategoryDetail} />
        <ExploreStack.Screen name="SubCategories" component={SubCategories} />
        <ExploreStack.Screen name="SearchGrocery" component={SearchGrocery} />
        <ExploreStack.Screen
          name="SubSubCategories"
          component={SubSubCategories}
        />
      </ExploreStack.Navigator>
    </>
  );
};

export default ExploreNavigator;
