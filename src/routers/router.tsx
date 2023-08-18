import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
import {SplashScreen} from '../screens';
import TabNavigator from './TabNavigator';
import WelcomeNavigator from './WelcomeNavigator';

const Router = () => {
  const [isWelcome, setIsWelcome] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsWelcome(false);
    }, 1500);
  }, []);

  const auth = useSelector(authSelector);

  return isWelcome ? (
    <SplashScreen />
  ) : auth.uid ? (
    <TabNavigator />
  ) : (
    <WelcomeNavigator />
  );
};

export default Router;
