import React, {useEffect, useState} from 'react';
import TabNavigator from './src/routers/TabNavigator';
import {SplashScreen} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeNavigator from './src/routers/WelcomeNavigator';

const App = () => {
  const [isWelcome, setIsWelcome] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLogin(false);
      setIsWelcome(false);
    }, 1500);
  }, []);

  return (
    <NavigationContainer>
      {isWelcome ? (
        <SplashScreen />
      ) : isLogin ? (
        <TabNavigator />
      ) : (
        <WelcomeNavigator />
      )}
    </NavigationContainer>
  );
};

export default App;
