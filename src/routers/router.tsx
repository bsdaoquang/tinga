import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
import MainNavigator from './MainNavigator';
import WelcomeNavigator from './WelcomeNavigator';

const Router = () => {
  const auth = useSelector(authSelector);

  return (
    <NavigationContainer>
      {auth.id ? <MainNavigator /> : <WelcomeNavigator />}
    </NavigationContainer>
  );
};

export default Router;
