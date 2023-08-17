import React, {ReactNode} from 'react';
import {
  Dimensions,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {appColors} from '../constants/appColors';
import {SpaceComponent, TextComponent} from '.';
import {fontFamilys} from '../constants/fontFamily';
import {global} from '../styles/global';

interface Props {
  text: string;
  onPress: () => void;
  outline?: boolean;
  color?: string;
  textColor?: string;
  width?: number;
  icon?: ReactNode;
  flex?: number;
  disable?: boolean;
  height?: number;
  font?: any;
  styles?: StyleProp<ViewStyle>;
  iconRight?: boolean;
  fontStyles?: StyleProp<TextStyle>;
}

export const ButtonComponent = (props: Props) => {
  const {
    text,
    textColor,
    color,
    onPress,
    width,
    outline,
    icon,
    flex,
    disable,
    fontStyles,
    font,
    height,
    iconRight,
    styles,
  } = props;

  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[
        global.row,
        {
          width: width,
          flex: flex,
          borderWidth: outline ? 1 : 0,
          borderColor: color ? color : appColors.gray,
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor: outline
            ? appColors.white
            : color
            ? color
            : disable
            ? appColors.gray
            : appColors.primary,
          alignItems: 'center',
          justifyContent: 'center',
        },
        styles,
      ]}>
      {icon && !iconRight && icon}
      <SpaceComponent width={4} />
      <TextComponent
        flex={iconRight ? 1 : 0}
        size={14}
        text={text}
        font={font ?? fontFamilys.bold}
        styles={[
          {
            marginLeft: icon ? 4 : 0,
            marginRight: iconRight ? -20 : 0,
            color: outline
              ? appColors.text
              : textColor
              ? textColor
              : appColors.white,
          },
          fontStyles,
        ]}
      />
      {iconRight && icon}
    </TouchableOpacity>
  );
};
