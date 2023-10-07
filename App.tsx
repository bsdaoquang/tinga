import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Router from './src/routers/router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import {SplashScreen} from './src/screens';
import {TourGuideProvider} from 'rn-tourguide';
import codePush from 'react-native-code-push';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

const App = () => {
  const [isWelcome, setIsWelcome] = useState(true);

  useEffect(() => {
    codePush.sync({
      updateDialog: {
        title: 'Update',
        optionalInstallButtonLabel: 'Install',
        optionalIgnoreButtonLabel: 'Cancel',
        optionalUpdateMessage: 'New version available, please update',
      },
      installMode: codePush.InstallMode.IMMEDIATE,
    });

    setTimeout(() => {
      setIsWelcome(false);
    }, 1000);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <Host>
          {!isWelcome ? (
            <TourGuideProvider
              {...{borderRadius: 16}}
              tooltipStyle={{
                direction: 'ltr',
                flexDirection: 'row',
              }}
              labels={{
                finish: ' ',
              }}>
              <Router />
            </TourGuideProvider>
          ) : (
            <SplashScreen />
          )}
        </Host>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default codePush(codePushOptions)(App);
