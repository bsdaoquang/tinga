import {View, Text, Image} from 'react-native';
import React from 'react';
import {Product} from '../../../Models/Product';
import {RowComponent, TextComponent} from '../../../components';
import CheckBox from '@react-native-community/checkbox';
import {global} from '../../../styles/global';
import {appColors} from '../../../constants/appColors';

interface Props {
  item: Product;
}

const ProductItem = (props: Props) => {
  const {item} = props;

  return (
    <RowComponent
      styles={{marginBottom: 16, marginTop: 8, paddingHorizontal: 16}}>
      <CheckBox />
      {item.imageUrl ? (
        <Image
          source={{uri: item.imageUrl}}
          style={[global.avatarContainer, {resizeMode: 'cover'}]}
        />
      ) : (
        <View style={[global.avatarContainer]} />
      )}
      <View style={{flex: 1, paddingHorizontal: 12}}>
        <TextComponent text={item.title} size={14} />
        <TextComponent
          text={`$${item.price.toFixed(2)}`}
          size={12}
          color={appColors.gray4}
        />
      </View>
    </RowComponent>
  );
};

export default ProductItem;
