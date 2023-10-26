import React, {useEffect, useState} from 'react';
import codePush from 'react-native-code-push';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import {Provider} from 'react-redux';
import {TourGuideProvider, useTourGuideController} from 'rn-tourguide';
import handleGetData from './src/apis/productAPI';
import store from './src/redux/store';
import Router from './src/routers/router';
import {SplashScreen} from './src/screens';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

const App = () => {
  const [isWelcome, setIsWelcome] = useState(true);
  const {stop} = useTourGuideController();

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

    getProfile();
  }, []);

  const getProfile = async () => {
    const api = `/getUserProfile`;
    try {
      await handleGetData.handleUser(api).then((res: any) => {
        setIsWelcome(false);
      });
    } catch (error) {
      console.log(error);
      setIsWelcome(false);
    }
  };

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
                finish: 'Close',
              }}
              tooltipComponent={() => null}
            >
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
