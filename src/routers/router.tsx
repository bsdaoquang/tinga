import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
import MainNavigator from './MainNavigator';
import WelcomeNavigator from './WelcomeNavigator';
import {groceriesSelector} from '../redux/reducers/groceryReducer';

const Router = () => {
  const auth = useSelector(authSelector);
  const groceriesList = useSelector(groceriesSelector);

  return (
    <NavigationContainer>
      {auth.access_token ? <MainNavigator /> : <WelcomeNavigator />}
    </NavigationContainer>
  );
};

export default Router;
