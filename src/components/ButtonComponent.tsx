import React from 'react';
import {Dimensions, StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
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
  icon?: any;
  flex?: number;
  disable?: boolean;
  height?: number;
  font?: any;
  styles?: StyleProp<ViewStyle>;
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

    font,
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
          paddingVertical: 10,
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
      {icon && icon}
      <SpaceComponent width={4} />
      <TextComponent
        flex={0}
        size={14}
        text={text}
        font={font ?? fontFamilys.bold}
        styles={{
          marginLeft: icon ? 4 : 0,
          color: outline
            ? appColors.text
            : textColor
            ? textColor
            : appColors.white,
        }}
      />
    </TouchableOpacity>
  );
};
