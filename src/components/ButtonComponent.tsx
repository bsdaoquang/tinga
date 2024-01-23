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
import Octicons from 'react-native-vector-icons/Octicons';

interface Props {
  text: string;
  onPress: () => void;
  outline?: boolean;
  color?: string;
  textColor?: string;
  width?: any;
  icon?: ReactNode;
  flex?: number;
  disable?: boolean;
  height?: number;
  font?: any;
  styles?: StyleProp<ViewStyle>;
  iconRight?: boolean;
  fontStyles?: StyleProp<TextStyle>;
  disableColor?: string;
  disableTextColor?: string;
  textStyles?: StyleProp<TextStyle>;
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
    disableColor,
    disableTextColor,
    height,
    iconRight,
    styles,
    textStyles,
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
          borderWidth: outline ? 2 : 0,
          borderColor: color ? color : '#ABC43F',
          borderRadius: 12,
          paddingVertical: outline ? 14 : 16,
          paddingHorizontal: 16,
          backgroundColor: outline
            ? appColors.white
            : disable
            ? disableColor
              ? disableColor
              : appColors.gray
            : color
            ? color
            : appColors.success1,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disable ? 0.7 : 1,
        },
        styles,
      ]}>
      {icon && !iconRight && icon}
      <SpaceComponent width={4} />
      <TextComponent
        flex={iconRight ? 1 : 0}
        size={16}
        text={text}
        font={font ?? fontFamilys.bold}
        styles={[
          {
            marginLeft: icon ? 4 : 0,
            marginRight: iconRight ? -20 : 0,
            color: disableTextColor
              ? disableTextColor
              : outline
              ? appColors.text
              : textColor
              ? textColor
              : appColors.text,
          },
          fontStyles,
        ]}
      />

      {iconRight && (
        <Octicons name="arrow-right" size={20} color={appColors.text} />
      )}
    </TouchableOpacity>
  );
};
