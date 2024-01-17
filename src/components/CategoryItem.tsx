import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TextComponent} from '.';
import {Category} from '../Models/Category';
import {appSize} from '../constants/appSize';

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
      {item.image ? (
        <FastImage
          source={{
            uri: item.image,
          }}
          style={{
            width: '100%',
            height: 100,
            borderRadius: 8,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : (
        <View
          style={{
            width: '100%',
            height: 100,
            borderRadius: 8,
            backgroundColor: '#e0e0e0',
          }}
        />
      )}

      <TextComponent text={item.name} line={2} />
    </TouchableOpacity>
  );
};

export default CategoryItem;
