import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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

  return isWelcome ? (
    <SplashScreen />
  ) : (
    <NavigationContainer>
      {1 < 2 ? <TabNavigator /> : <WelcomeNavigator />}
    </NavigationContainer>
  );
};

export default Router;
