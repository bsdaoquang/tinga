import React from 'react';
import {Image, View} from 'react-native';
import {RowComponent, TitleComponent} from '../../../components';
import {appColors} from '../../../constants/appColors';

const Welcome2 = () => {
  return (
    <View style={{flex: 1}}>
      <RowComponent styles={{alignItems: 'flex-start', paddingHorizontal: 16}}>
        <TitleComponent text="2. " size={26} color={appColors.white} flex={0} />
        <TitleComponent
          text="Search, discover & swap for healthier, diet-compatible options"
          size={26}
          color={appColors.white}
          flex={1}
        />
      </RowComponent>
      <Image
        source={require('../../../assets/images/welcome-2.png')}
        style={{
          width: '100%',
          resizeMode: 'contain',
          flex: 1,
        }}
      />
    </View>
  );
};

export default Welcome2;
