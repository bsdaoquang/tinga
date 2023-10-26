import React from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {appColors} from '../constants/appColors';
import {global} from '../styles/global';

const SplashScreen = () => {
  return (
    <View
      style={[
        global.container,
        {
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <Image
        source={require('../assets/images/TingaLogo.png')}
        style={{width: 175, height: 68, resizeMode: 'contain'}}
      />
      <ActivityIndicator size={24} color={appColors.gray} />
    </View>
  );
};

export default SplashScreen;
