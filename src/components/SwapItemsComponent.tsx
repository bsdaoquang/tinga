import {Add, Location} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
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
import ModalSwapProduct from '../modals/ModalSwapProduct';
import {groceriesSelector} from '../redux/reducers/groceryReducer';
import {global} from '../styles/global';
import LoadingDotComponent from './LoadingDotComponent';

interface Props {
  product?: ProductDetail;
  onSwapItem?: (item: ProductDetail) => void;
}

const SwapItemsComponent = (props: Props) => {
  const {product, onSwapItem} = props;
  const [items, setItems] = useState<SwapModel[]>([]);
  const [isVisibleModalSwap, setIsVisibleModalSwap] = useState(false);
  const [productSwap, setProductSwap] = useState<ProductDetail>();
  const [isLoading, setIsLoading] = useState(false);
  const groceryList: ProductDetail[] = useSelector(groceriesSelector);
  const [productToSwap, setProductToSwap] = useState<{
    product_id: number;
    shop_id: number;
  }>();

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
    // const swapItems = items.find(
    //   element =>
    //     element.product_id === product?.id &&
    //     element.shop_id === product.shop_id,
    // );

    const data: ProductDetail[] = [];
    items.forEach((item: any) => {
      const products = item.swapproducts;

      products.forEach((product: any) => {
        const index = data.findIndex(
          element =>
            element.id === product.id && element.shop_id === product.shop_id,
        );
        index === -1 && data.push(product);
      });
    });

    return data.length > 0 ? (
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
        </RowComponent>
        <FlatList
          style={{marginTop: 16}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={item => `children${item.id}shopId${item.shop_id}`}
          renderItem={({item}) => (
            <View
              key={`children${item.id}shopId${item.shop_id}`}
              style={{marginLeft: 6, marginRight: 12, marginBottom: 12}}>
              {renderCardItem(item, () =>
                onSwapItem ? onSwapItem(item) : undefined,
              )}
            </View>
          )}
        />
      </>
    ) : (
      <></>
    );
  };
  const renderCardItem = (item: Swapproduct, onPress: () => void) => {
    const indexProduct = groceryList.findIndex(
      element => element.id === item.id && element.shop_id === item.shop_id,
    );
    return (
      <CardContent
        // key={`children${item.id}shopId${item.shop_id}`}
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
              indexProduct !== -1 ? '#263238' : appColors.primary,
            borderRadius: 14,
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          icon={
            indexProduct === -1 ? (
              <Add size={24} color={appColors.white} />
            ) : (
              <AntDesign name="check" size={20} color={appColors.white} />
            )
          }
          disable={indexProduct !== -1}
          onPress={onPress}
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
  };

  return isLoading ? (
    <LoadingDotComponent mess="Searching for products" />
  ) : items.length > 0 ? (
    <View>
      {product ? (
        <>{renderSwapItemsByProduct()}</>
      ) : (
        <View>
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
          </RowComponent>
          {items.map((parentItem, index) => (
            <>
              <RowComponent styles={{marginTop: 16}}>
                <TitleComponent text={parentItem.name} />
              </RowComponent>
              <RowComponent
                styles={{justifyContent: 'space-between'}}
                key={`product${parentItem.product_id}shopId${parentItem.shop_id}-${index}`}>
                {parentItem.swapproducts.map(item =>
                  renderCardItem(item, () => {
                    setProductToSwap({
                      product_id: parentItem.product_id,
                      shop_id: parentItem.shop_id,
                    });
                    setProductSwap(item);
                    setIsVisibleModalSwap(true);
                  }),
                )}
              </RowComponent>
            </>
          ))}
        </View>
      )}
      <ModalSwapProduct
        product={product ? product : productToSwap}
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
