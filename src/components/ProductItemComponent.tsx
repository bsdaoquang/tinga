import {View, Text, Image, TouchableOpacity} from 'react-native';
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
}

const ProductItemComponent = (props: Props) => {
  const [isVisibileModalProduct, setIsVisibileModalProduct] = useState(false);

  const {item} = props;

  const product = {
    count: 1,
    description: '',
    id: '3',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
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
        styles={{padding: 0, width: (appSize.width - 48) / 2, marginBottom: 12}}
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
          <TextComponent text={`$ ${item.price.toFixed(2)}`} size={12} />
          <TextComponent text={item.title} size={12} line={1} />
          <SpaceComponent height={8} />
          <RowComponent justify="flex-start">
            <Location size={14} color={appColors.gray} />
            <TextComponent
              text={` ${item.mart}`}
              size={12}
              flex={0}
              color={appColors.gray}
            />
            <SpaceComponent width={12} />
            <Star1 size={14} color={appColors.gray} />
            <TextComponent
              text={` ${item.rating}`}
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
