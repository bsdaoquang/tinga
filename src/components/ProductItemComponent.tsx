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

interface Props {
  item: any;
  styles?: StyleProp<ViewStyle>;
}

const ProductItemComponent = (props: Props) => {
  const [isVisibileModalProduct, setIsVisibileModalProduct] = useState(false);

  const {item, styles} = props;

  const product = {
    count: 1,
    description: '',
    id: '3',
    imageUrl:
      item && item.imageUrl
        ? item.imageUrl
        : 'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    mart: 'Walmart',
    price: 3.99,
    rating: 4.5,
    title: 'Dempsters Smooth Multigrains Bread',
  };

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
        key={`${product.id}`}>
        <Image
          source={{
            uri: product.imageUrl,
          }}
          style={{
            width: '100%',
            height: 96,
            resizeMode: 'cover',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <Button
          styles={{
            width: 28,
            height: 28,
            backgroundColor: '#41393EA3',
            borderRadius: 14,
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          icon={<Add size={24} color={appColors.white} />}
          onPress={() => {}}
        />
        <View style={{padding: 10}}>
          <TextComponent text={`$ ${product.price.toFixed(2)}`} size={12} />
          <TextComponent text={product.title} size={12} line={2} />
          <SpaceComponent height={8} />
          <RowComponent justify="flex-start">
            <Location size={14} color={appColors.gray} />
            <TextComponent
              text={` ${product.mart}`}
              size={12}
              flex={0}
              color={appColors.gray}
            />
            <SpaceComponent width={12} />
            <Star1 size={14} color={appColors.gray} />
            <TextComponent
              text={` ${product.rating}`}
              size={12}
              flex={0}
              color={appColors.gray}
            />
          </RowComponent>
        </View>
      </CardContent>
      <ModalProduct
        visible={isVisibileModalProduct}
        onClose={() => setIsVisibileModalProduct(false)}
        product={product}
      />
    </>
  );
};

export default ProductItemComponent;
