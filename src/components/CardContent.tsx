import React, {ReactNode} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {global} from '../styles/global';
import {appColors} from '../constants/appColors';

interface Props {
  children: ReactNode;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>;
  color?: string;
  isShadow?: boolean;
}

const CardContent = ({children, onPress, styles, color, isShadow}: Props) => {
  const style = [
    !isShadow ? null : global.shadow,
    global.card,
    styles,
    {
      backgroundColor: color ?? appColors.gray1,
    },
  ];

  return onPress ? (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={style}>{children}</View>
  );
};

export default CardContent;
