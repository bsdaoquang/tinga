import {View, Text, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import TextComponent from './TextComponent';
import {global} from '../styles/global';

interface Props {
  text?: string;
  icon?: ReactNode;
  onPress: () => void;
  textColor?: string;
  textSize?: number;
}

const Button = (props: Props) => {
  const {text, icon, onPress, textColor, textSize} = props;

  return (
    <TouchableOpacity onPress={onPress} style={[global.rowCenter]}>
      {icon && icon}
      {text && (
        <TextComponent text={text} flex={0} color={textColor} size={textSize} />
      )}
    </TouchableOpacity>
  );
};

export default Button;
