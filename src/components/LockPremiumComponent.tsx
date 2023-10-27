import React from 'react';
import {View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import {appColors} from '../constants/appColors';
import {authSelector} from '../redux/reducers/authReducer';

interface Props {
  sizeIcon?: number;
  color?: string;
}

const LockPremiumComponent = (props: Props) => {
  const {sizeIcon, color} = props;

  const auth = useSelector(authSelector);

  const size = sizeIcon ? sizeIcon + 8 : 24;
  return auth.is_premium === 0 ? (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: color ?? appColors.primary,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 8,
        right: 8,
      }}
    >
      <Fontisto name="locked" size={sizeIcon ?? 14} color={appColors.white} />
    </View>
  ) : (
    <></>
  );
};

export default LockPremiumComponent;
