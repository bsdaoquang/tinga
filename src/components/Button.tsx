import {View, Text, TouchableOpacity, StyleProp, TextStyle} from 'react-native';
import React, {ReactNode} from 'react';
import TextComponent from './TextComponent';
import {global} from '../styles/global';
import {ViewStyle} from 'react-native';

interface Props {
  text?: string;
  icon?: ReactNode;
  onPress: () => void;
  textColor?: string;
  textSize?: number;
  fontStyles?: StyleProp<TextStyle>;
  disable?: boolean;
  styles?: StyleProp<ViewStyle>;
}

const Button = (props: Props) => {
  const {
    text,
    icon,
    onPress,
    textColor,
    textSize,
    fontStyles,
    disable,
    styles,
  } = props;

  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[global.rowCenter, styles]}>
      {icon && icon}
      {text && (
        <TextComponent
          text={text}
          flex={0}
          color={textColor}
          size={textSize}
          styles={fontStyles}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;
