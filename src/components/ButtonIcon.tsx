import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';

interface Props {
  icon: any;
  color?: string;
  onPress: () => void;
  disable?: boolean;
  styles?: StyleProp<ViewStyle>;
}

const ButtonIcon = ({icon, color, styles, onPress, disable}: Props) => {
  return (
    <TouchableOpacity
      disabled={disable}
      style={[
        {
          // // ...global.card,
          paddingHorizontal: 8,
          borderRadius: 100,
        },
        styles,
      ]}
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
};

export default ButtonIcon;
