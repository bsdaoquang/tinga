import React, {ReactNode} from 'react';
import {StyleProp, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {appColors} from '../constants/appColors';
import {global} from '../styles/global';
import TextComponent from './TextComponent';

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
          color={textColor ?? appColors.primary}
          size={textSize ?? 14}
          styles={fontStyles}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;
