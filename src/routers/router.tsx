import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
import {SplashScreen} from '../screens';
import MainNavigator from './MainNavigator';
import WelcomeNavigator from './WelcomeNavigator';
import {StatusBar} from 'react-native';

const Router = () => {
  const [isWelcome, setIsWelcome] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsWelcome(false);
    }, 1500);
  }, []);

  const auth = useSelector(authSelector);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      {isWelcome ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          {auth.uid ? <MainNavigator /> : <WelcomeNavigator />}
        </NavigationContainer>
      )}
    </>
  );
};

export default Router;
