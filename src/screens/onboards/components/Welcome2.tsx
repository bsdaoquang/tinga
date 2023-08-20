import React from 'react';
import {Image, View} from 'react-native';
import {
  RowComponent,
  SectionComponent,
  TitleComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';

const Welcome2 = () => {
  return (
    <View style={{flex: 1, marginTop: 16}}>
      <RowComponent styles={{alignItems: 'flex-start', paddingHorizontal: 16}}>
        <TitleComponent text="2. " size={26} color={appColors.white} flex={0} />
        <TitleComponent
          text="Search, discover & swap for healthier, diet-compatible options"
          size={26}
          color={appColors.white}
          flex={1}
        />
      </RowComponent>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Image
          source={require('../../../assets/images/WelcomeImage.png')}
          style={{
            width: '100%',
            resizeMode: 'cover',
          }}
        />
      </View>
    </View>
  );
};

export default Welcome2;