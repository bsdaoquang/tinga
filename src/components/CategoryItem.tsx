import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {TextComponent} from '.';
import {appSize} from '../constants/appSize';
import {Category} from '../Models/Category';

interface Props {
  item: Category;
  onPress: () => void;
}

const CategoryItem = (props: Props) => {
  const {item, onPress} = props;

  return (
    <TouchableOpacity
      key={item.id}
      onPress={onPress}
      style={{
        width: (appSize.width - 64) / 3,
        marginBottom: 16,
        marginRight: 16,
      }}>
      <Image
        source={{
          uri: item.imageUrl,
        }}
        style={{
          width: '100%',
          height: 100,
          borderRadius: 8,
          resizeMode: 'cover',
        }}
      />
      <TextComponent text={item.title} line={2} />
    </TouchableOpacity>
  );
};

export default CategoryItem;
