import React, {ReactNode} from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {global} from '../styles/global';
import {appColors} from '../constants/appColors';

interface Props {
  children: ReactNode;
  onPress?: () => void;
  styles?: ViewStyle;
  color?: string;
}

const CardContent = ({children, onPress, styles, color}: Props) => {
  return onPress ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        global.card,
        styles,
        {
          backgroundColor: color ?? appColors.white,
        },
      ]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View
      style={[
        global.card,
        styles,
        {
          backgroundColor: color ?? appColors.white,
        },
      ]}>
      {children}
    </View>
  );
};

export default CardContent;
