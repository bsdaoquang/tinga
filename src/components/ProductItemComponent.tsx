import {Add, Location, Star1} from 'iconsax-react-native';
import React, {useState} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {
  Button,
  CardContent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import {Product} from '../Models/Product';
import {appColors} from '../constants/appColors';
import {appSize} from '../constants/appSize';
import {ModalProduct} from '../modals';
import {authSelector} from '../redux/reducers/authReducer';
import {HandleProduct} from '../utils/HandleProduct';
import LockPremiumComponent from './LockPremiumComponent';

interface Props {
  item: Product;
  styles?: StyleProp<ViewStyle>;
  onReload?: () => void;
  isCheckPremium?: boolean;
}

const ProductItemComponent = (props: Props) => {
  const [isVisibileModalProduct, setIsVisibileModalProduct] = useState(false);

  const {item, styles, onReload, isCheckPremium} = props;
  const auth = useSelector(authSelector);

  return (
    <>
      <CardContent
        onPress={
          isCheckPremium && auth.is_premium === 0
            ? undefined
            : () => setIsVisibileModalProduct(true)
        }
        isShadow
        color={appColors.white}
        styles={[
          {
            padding: 0,
            width: (appSize.width - 48) / 2,
            marginBottom: 12,
          },

          styles,
        ]}
        key={`${item.id}`}>
        {item.image ? (
          <FastImage
            source={{
              uri: item.image,
            }}
            style={{
              width: '100%',
              height: 96,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
            resizeMode={FastImage.resizeMode.contain}
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
          onPress={() => HandleProduct.addToList(item, 1)}
        />
        <View style={{padding: 10}}>
          <TextComponent text={`$ ${item.price}`} size={12} />
          <TextComponent
            text={item.name}
            size={12}
            line={2}
            styles={{minHeight: 30}}
          />
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
          </RowComponent>
        </View>
        {isCheckPremium && auth.is_premium === 0 && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              flex: 0,
              backgroundColor: appColors.white,
              opacity: 0.92,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}>
            <LockPremiumComponent sizeIcon={16} />
          </View>
        )}
      </CardContent>

      <ModalProduct
        visible={isVisibileModalProduct}
        onClose={() => {
          setIsVisibileModalProduct(false);
          onReload && onReload();
        }}
        product={item}
        products={[]}
        onAddToList={async (count: number) =>
          await HandleProduct.addToList(item, count)
        }
      />
    </>
  );
};

export default ProductItemComponent;
