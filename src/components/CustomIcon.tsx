import {View, Text} from 'react-native';
import React, {ReactNode} from 'react';
import {appColors} from '../constants/appColors';

interface Props {
  icon: ReactNode;
  size?: number;
  color?: string;
  radius?: number;
}

const CustomIcon = (props: Props) => {
  const {icon, size, color, radius} = props;

  return (
    <View
      style={{
        backgroundColor: color ?? appColors.primary,
        width: size ?? 28,
        height: size ?? 28,
        borderRadius: radius ?? 14,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {icon}
    </View>
  );
};

export default CustomIcon;
