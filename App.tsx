import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Router from './src/routers/router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import {SplashScreen} from './src/screens';

const App = () => {
  const [isWelcome, setIsWelcome] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsWelcome(false);
    }, 1000);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <Host>{!isWelcome ? <Router /> : <SplashScreen />}</Host>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
