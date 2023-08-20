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
  return (
    <View style={{...global.shadow, flex: 1}}>
      {onPress ? (
        <TouchableOpacity
          onPress={onPress}
          style={[
            global.card,
            styles,
            {
              backgroundColor: color ?? appColors.gray1,
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
              backgroundColor: color ?? appColors.gray1,
            },
          ]}>
          {children}
        </View>
      )}
    </View>
  );
};

export default CardContent;
