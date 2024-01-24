import {Add, Location} from 'iconsax-react-native';
import React, {useState} from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  CardContent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import {Product, ProductDetail} from '../Models/Product';
import {appColors} from '../constants/appColors';
import {appSize} from '../constants/appSize';
import {LoadingModal, ModalProduct} from '../modals';
import {authSelector} from '../redux/reducers/authReducer';
import {
  groceriesSelector,
  updateGroceryList,
} from '../redux/reducers/groceryReducer';
import LockPremiumComponent from './LockPremiumComponent';

interface Props {
  item: Product;
  styles?: StyleProp<ViewStyle>;
  onReload?: () => void;
  isCheckPremium?: boolean;
  // category: Category;
}

const ProductItemComponent = (props: Props) => {
  const [isVisibileModalProduct, setIsVisibileModalProduct] = useState(false);

  const {item, styles, onReload, isCheckPremium} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const auth = useSelector(authSelector);
  const groceryList: ProductDetail[] = useSelector(groceriesSelector);

  const dispatch = useDispatch();

  const renderThumbType = () => {
    return (
      <View
        style={{
          width: 18,
          height: 18,
          backgroundColor: item.thumb_color,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
          transform: item.thumb_type === 'Bad' ? 'rotate(180deg)' : '',
        }}>
        <Text style={{fontSize: 9, color: '#FFD97D', lineHeight: 11}}>
          {item.thumb_type === 'Normal' ? '👌' : `👍`}
        </Text>
      </View>
    );
  };

  const renderButtonAdd = (item: Product) => {
    const indexOfList = groceryList.findIndex(
      element => element.id === item.id && element.shop_id === item.shop_id,
    );

    return (
      <Button
        styles={{
          width: 28,
          height: 28,
          backgroundColor: indexOfList !== -1 ? '#263238' : appColors.primary,
          borderRadius: 14,
          position: 'absolute',
          top: 10,
          right: 10,
        }}
        icon={
          indexOfList === -1 ? (
            <Add size={24} color={appColors.white} />
          ) : (
            <AntDesign name="check" size={20} color={appColors.white} />
          )
        }
        onPress={async () => {
          dispatch(updateGroceryList(item));
        }}
      />
    );
  };

  return (
    <>
      <CardContent
        // onPress={() => console.log(item)}
        onPress={() => {
          isCheckPremium && auth.is_premium === 0
            ? undefined
            : setIsVisibileModalProduct(true);
        }}
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

        {renderButtonAdd(item)}
        <View style={{padding: 10}}>
          <TextComponent text={`$ ${item.price}`} size={12} />
          <TextComponent
            text={item.name}
            size={12}
            line={2}
            styles={{minHeight: 30}}
          />
          <SpaceComponent height={8} />
          <RowComponent justify="space-between">
            <RowComponent>
              <Location size={14} color={appColors.gray} />
              <TextComponent
                text={` ${item.shopname}`}
                size={12}
                flex={0}
                color={appColors.gray}
              />
            </RowComponent>
            {renderThumbType()}
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
      />
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default ProductItemComponent;
