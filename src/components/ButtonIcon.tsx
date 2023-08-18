import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {appColors} from '../constants/appColors';
import {global} from '../styles/global';

interface Props {
  icon: any;
  color?: string;
  onPress: () => void;
  disable?: boolean;
  styles?: StyleProp<ViewStyle>;
  size?: number;
  radius?: number;
}

const ButtonIcon = ({
  icon,
  color,
  styles,
  onPress,
  disable,
  size,
  radius,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disable}
      style={[
        {
          width: size ?? 30,
          height: size ?? 30,
          paddingHorizontal: 8,
          borderRadius: radius ?? 100,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color ?? appColors.white,
        },
        styles,
        global.shadow,
      ]}
      onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

export default ButtonIcon;
