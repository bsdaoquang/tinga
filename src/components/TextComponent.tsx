import React, {ReactNode} from 'react';
import {StyleProp, Text} from 'react-native';
import {appColors} from '../constants/appColors';
import {appSize} from '../constants/appSize';
import {global} from '../styles/global';
import {fontFamilys} from '../constants/fontFamily';

const TextComponent = ({
  text,
  size,
  color,
  flex,
  font,
  icon,
  label,
  line,
  height,
  transform,
  styles,
}: {
  text: string;
  size?: number;
  color?: string;
  flex?: number;
  font?: any;
  icon?: ReactNode;
  label?: string;
  line?: number;
  height?: number;
  styles?: StyleProp<any>;
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined;
}) => {
  return (
    <Text
      style={[
        global.text,
        {
          flex: flex ?? 1,
          fontSize: size ?? appSize.textSize,
          color: color ?? appColors.text,
          lineHeight: height ? height : size ? size + 4 : 20,
          textTransform: transform ?? 'none',
          fontFamily: font ?? fontFamilys.regular,
        },

        styles,
      ]}
      numberOfLines={line}>
      {text}
    </Text>
  );
};

export default TextComponent;
