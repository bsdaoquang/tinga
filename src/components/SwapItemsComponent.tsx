import {Add, Location} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  CardContent,
  RowComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '.';
import {ProductDetail, SwapModel, Swapproduct} from '../Models/Product';
import handleGetData from '../apis/productAPI';
import {appColors} from '../constants/appColors';
import {appSize} from '../constants/appSize';
import {LoadingModal} from '../modals';
import ModalSwapProduct from '../modals/ModalSwapProduct';
import {global} from '../styles/global';

interface Props {
  product?: ProductDetail;
}

const SwapItemsComponent = (props: Props) => {
  const {product} = props;
  const [items, setItems] = useState<SwapModel[]>([]);
  const [isVisibleModalSwap, setIsVisibleModalSwap] = useState(false);
  const [productSwap, setProductSwap] = useState<Swapproduct>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSwapItems();
  }, [product]);

  const getSwapItems = async () => {
    const api = `/listOfSwaps`;
    setIsLoading(true);
    try {
      const res: any = await handleGetData.handleProduct(
        api,
        undefined,
        'post',
      );
      res && res.length > 0 && setItems(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const renderThumbType = (item: Swapproduct) => {
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

  const renderSwapItemsByProduct = () => {
    const swapItems = items.find(
      element =>
        element.product_id === product?.id &&
        element.shop_id === product.shop_id,
    );

    return swapItems && swapItems.swapproducts.length > 0 ? (
      <>
        <RowComponent
          styles={{
            alignItems: 'flex-start',
            paddingTop: 12,
          }}>
          <Image
            source={require('../assets/images/TingaLogo.png')}
            style={{
              width: 82,
              height: 26,
              resizeMode: 'contain',
            }}
          />
          <TitleComponent
            text="swaps"
            color={appColors.primary}
            size={20}
            height={19}
          />

          <Button
            onPress={() => {}}
            text="View All"
            fontStyles={{fontSize: 14, color: appColors.primary}}
          />
        </RowComponent>
        <FlatList
          style={{marginTop: 16}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={swapItems.swapproducts}
          renderItem={({item}) => (
            <View style={{marginLeft: 6, marginRight: 12, marginBottom: 12}}>
              {renderCardItem(item)}
            </View>
          )}
        />
      </>
    ) : (
      <></>
    );
  };

  const renderCardItem = (item: Swapproduct) => (
    <CardContent
      key={`children${item.id}shopId${item.shop_id}`}
      color={appColors.white}
      styles={[
        global.shadow,
        {
          width: (appSize.width - 48) / 2,
          marginBottom: product ? 0 : 16,
          padding: 0,
        },
      ]}>
      <Image
        source={{uri: item.image}}
        resizeMode="cover"
        style={{
          height: 100,
          width: 'auto',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />

      <Button
        styles={{
          width: 28,
          height: 28,
          backgroundColor:
            item.is_addedtolist === 1 ? '#263238' : appColors.primary,
          borderRadius: 14,
          position: 'absolute',
          top: 10,
          right: 10,
        }}
        icon={
          item.is_addedtolist === 0 ? (
            <Add size={24} color={appColors.white} />
          ) : (
            <AntDesign name="check" size={20} color={appColors.white} />
          )
        }
        disable={item.is_addedtolist === 1}
        onPress={() => {
          setProductSwap(item);
          setIsVisibleModalSwap(true);
        }}
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
          {renderThumbType(item)}
        </RowComponent>
      </View>
    </CardContent>
  );

  return isLoading ? (
    <ActivityIndicator />
  ) : items.length > 0 ? (
    <View>
      {product ? (
        <>{renderSwapItemsByProduct()}</>
      ) : (
        <>
          <RowComponent
            styles={{
              alignItems: 'flex-start',
              paddingTop: 12,
            }}>
            <Image
              source={require('../assets/images/TingaLogo.png')}
              style={{
                width: 82,
                height: 26,
                resizeMode: 'contain',
              }}
            />
            <TitleComponent
              text="swaps"
              color={appColors.primary}
              size={20}
              height={19}
            />

            <Button
              onPress={() => {}}
              text="View All"
              fontStyles={{fontSize: 14, color: appColors.primary}}
            />
          </RowComponent>
          {items.map(parentItem => (
            <RowComponent
              styles={{justifyContent: 'space-between'}}
              key={`product${parentItem.product_id}shopId${parentItem.shop_id}`}>
              {parentItem.swapproducts.map(item => renderCardItem(item))}
            </RowComponent>
          ))}
        </>
      )}
      <ModalSwapProduct
        product={product}
        swapProduct={productSwap}
        isVisible={isVisibleModalSwap}
        onClose={() => {
          setProductSwap(undefined);
          setIsVisibleModalSwap(false);
          getSwapItems();
        }}
      />
    </View>
  ) : (
    <></>
  );
};

export default SwapItemsComponent;
