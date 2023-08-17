import {View, Text, TouchableOpacity, StyleProp, TextStyle} from 'react-native';
import React, {ReactNode} from 'react';
import TextComponent from './TextComponent';
import {global} from '../styles/global';

interface Props {
  text?: string;
  icon?: ReactNode;
  onPress: () => void;
  textColor?: string;
  textSize?: number;
  fontStyles?: StyleProp<TextStyle>;
}

const Button = (props: Props) => {
  const {text, icon, onPress, textColor, textSize, fontStyles} = props;

  return (
    <TouchableOpacity onPress={onPress} style={[global.rowCenter]}>
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
