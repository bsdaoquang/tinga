import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RecipesScreen from '../screens/recipes/RecipesScreen';
import RegenerateRecipes from '../screens/recipes/RegenerateRecipes';

const RecipeNavigator = () => {
  const RecipeStack = createNativeStackNavigator();
  return (
    <RecipeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RecipeStack.Screen name="recipeScreen" component={RecipesScreen} />
      <RecipeStack.Screen
        name="RegenerateRecipes"
        component={RegenerateRecipes}
      />
    </RecipeStack.Navigator>
  );
};

export default RecipeNavigator;
