import React, {useEffect, useState} from 'react';
import codePush from 'react-native-code-push';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Provider} from 'react-redux';
import {TourGuideProvider, useTourGuideController} from 'rn-tourguide';
import {
  Button,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from './src/components';
import {appColors} from './src/constants/appColors';
import store from './src/redux/store';
import Router from './src/routers/router';
import {SplashScreen} from './src/screens';
import {fontFamilys} from './src/constants/fontFamily';

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
                finish: 'Close',
              }}
              tooltipComponent={() =>
                null
                // <RowComponent
                //   styles={{
                //     paddingHorizontal: 10,
                //     paddingVertical: 8,
                //     backgroundColor: appColors.white,
                //     borderRadius: 8,
                //     marginTop: 0,
                //   }}>
                //   <TextComponent
                //     styles={{
                //       textAlign: 'center',
                //       textTransform: 'uppercase',
                //       flex: 0,
                //     }}
                //     font={fontFamilys.bold}
                //     text="Start here"
                //   />
                //   <SpaceComponent width={12} />
                //   <Button
                //     icon={
                //       <AntDesign
                //         name="close"
                //         size={18}
                //         color={appColors.primary1}
                //       />
                //     }
                //     onPress={() => stop()}
                //   />
                // </RowComponent>
              }>
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
