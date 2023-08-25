import {View, Text, Image, StyleProp, ImageStyle} from 'react-native';
import React from 'react';
import {global} from '../styles/global';

interface Props {
  imageUrl?: string;
  size?: number;
  styles?: StyleProp<ImageStyle>;
}

const ImageProduct = (props: Props) => {
  const {imageUrl, size, styles} = props;

  return imageUrl ? (
    <Image
      source={{uri: imageUrl}}
      style={[
        global.avatarContainer,
        {resizeMode: 'cover', width: size ?? 40, height: size ?? 40},
        styles,
      ]}
    />
  ) : (
    <View
      style={[
        global.avatarContainer,
        {width: size ?? 40, height: size ?? 40},
        styles,
      ]}
    />
  );
};

export default ImageProduct;
