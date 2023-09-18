import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  CardContent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import {appSize} from '../constants/appSize';
import {appColors} from '../constants/appColors';
import {Add, Location, Star1} from 'iconsax-react-native';
import {ModalProduct} from '../modals';
import {Product} from '../Models/Product';

interface Props {
  item: Product;
  styles?: StyleProp<ViewStyle>;
}

const ProductItemComponent = (props: Props) => {
  const [isVisibileModalProduct, setIsVisibileModalProduct] = useState(false);

  const {item, styles} = props;

  return (
    <>
      <CardContent
        onPress={() => setIsVisibileModalProduct(true)}
        isShadow
        color={appColors.white}
        styles={[
          {padding: 0, width: (appSize.width - 48) / 2, marginBottom: 12},
          styles,
        ]}
        key={`${item.id}`}>
        {item.image ? (
          <Image
            source={{
              uri: item.image,
            }}
            style={{
              width: '100%',
              height: 96,
              resizeMode: 'contain',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />
        ) : (
          <View
            style={{
              width: '100%',
              height: 96,
              backgroundColor: appColors.gray1,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />
        )}

        <Button
          styles={{
            width: 28,
            height: 28,
            backgroundColor: appColors.primary,
            borderRadius: 14,
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          icon={<Add size={24} color={appColors.white} />}
          onPress={() => {}}
        />
        <View style={{padding: 10}}>
          <TextComponent text={`$ ${item.price}`} size={12} />
          <TextComponent text={item.name} size={12} line={2} />
          <SpaceComponent height={8} />
          <RowComponent justify="flex-start">
            <Location size={14} color={appColors.gray} />
            <TextComponent
              text={` ${item.shopname}`}
              size={12}
              flex={0}
              color={appColors.gray}
            />
            <SpaceComponent width={12} />
            <Star1 size={14} color={appColors.gray} />
            {/* <TextComponent
              text={` ${item.rating}`}
              size={12}
              flex={0}
              color={appColors.gray}
            /> */}
          </RowComponent>
        </View>
      </CardContent>
      <ModalProduct
        visible={isVisibileModalProduct}
        onClose={() => setIsVisibileModalProduct(false)}
        product={item}
      />
    </>
  );
};

export default ProductItemComponent;
