import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {global} from '../styles/global';

interface Props {
  children: any;
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
  disable?: boolean;
}

const RowComponent = ({
  children,
  justify,
  styles,
  onPress,
  onLongPress,
  disable,
}: Props) => {
  return onPress ? (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        {
          ...global.rowContainer,
          justifyContent: justify ?? 'center',
        },
        styles,
      ]}
    >
      {children}
    </TouchableOpacity>
  ) : (
    <View
      style={[
        {
          ...global.rowContainer,
          justifyContent: justify ?? 'center',
        },
        styles,
      ]}
    >
      {children}
    </View>
  );
};

export default RowComponent;
