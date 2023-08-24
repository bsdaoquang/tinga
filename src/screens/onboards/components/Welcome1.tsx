import React from 'react';
import {Image, View} from 'react-native';
import {RowComponent, TitleComponent} from '../../../components';
import {appColors} from '../../../constants/appColors';

const Welcome1 = () => {
  return (
    <>
      <View style={{flex: 1}}>
        <RowComponent styles={{alignItems: 'flex-start'}}>
          <TitleComponent
            text="1. "
            size={26}
            color={appColors.white}
            flex={0}
          />
          <TitleComponent
            text="Tell Tinga how you & your household eats"
            size={26}
            color={appColors.white}
            flex={1}
          />
        </RowComponent>

        <Image
          source={require('../../../assets/images/welcome-1.png')}
          style={{
            width: '100%',
            resizeMode: 'contain',
            flex: 1,
          }}
        />
      </View>
    </>
  );
};

export default Welcome1;
