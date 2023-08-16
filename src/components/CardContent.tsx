import React, {ReactNode} from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {global} from '../styles/global';

interface Props {
  children: ReactNode;
  onPress?: () => void;
  styles?: ViewStyle;
}

const CardContent = ({children, onPress, styles}: Props) => {
  return onPress ? (
    <TouchableOpacity onPress={onPress} style={[global.card, styles]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[global.card, styles]}>{children}</View>
  );
};

export default CardContent;
