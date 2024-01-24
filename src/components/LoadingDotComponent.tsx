import React from 'react';
import {Text, View} from 'react-native';
import {RowComponent, TextComponent} from '.';
import LottieView from 'lottie-react-native';
import {appColors} from '../constants/appColors';

interface Props {
  mess?: string;
}

const LoadingDotComponent = ({mess}: {mess?: string}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <LottieView
        source={require('../assets/animation/loading.json')}
        style={{
          width: 50,
          height: 20,
          padding: 0,
        }}
        autoPlay
        loop={true}
      />
      <TextComponent
        text={mess ?? 'Loading'}
        flex={0}
        color={appColors.gray2}
      />
    </View>
  );
};

export default LoadingDotComponent;
