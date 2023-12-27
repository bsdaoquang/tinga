import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  CardContent,
  LoadingComponent,
  ProductItemComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '.';
import {appColors} from '../constants/appColors';
import {ProductDetail, SwapModel, Swapproduct} from '../Models/Product';
import handleGetData from '../apis/productAPI';
import {appSize} from '../constants/appSize';
import {global} from '../styles/global';
import {Add, Location} from 'iconsax-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LoadingModal} from '../modals';
import {showToast} from '../utils/showToast';

interface Props {
  product?: ProductDetail;
}

const SwapItemsComponent = (props: Props) => {
  const {product} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<SwapModel[]>([]);
  const [isSwaping, setIsSwaping] = useState(false);

  useEffect(() => {
    getSwapItems();
  }, []);

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

  const handleSwapItem = async (item: {
    product_id: number;
    shop_id: number;
    swap_product_id: number;
    swap_shop_id: number;
  }) => {
    const api = `/swapItems`;

    setIsSwaping(true);

    try {
      const res: any = await handleGetData.handleProduct(api, item, 'post');
      showToast(res.message);
      setIsSwaping(false);
    } catch (error) {
      setIsSwaping(false);
      console.log(error);
    }
  };

  return (
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

        <Button
          onPress={() => {}}
          text="View All"
          fontStyles={{fontSize: 14, color: appColors.primary}}
        />
      </RowComponent>
      {items.length > 0 ? (
        product ? (
          <></>
        ) : (
          <>
            {items.map(parentItem => (
              <RowComponent
                styles={{justifyContent: 'space-between'}}
                key={`product${parentItem.product_id}shopId${parentItem.shop_id}`}>
                {parentItem.swapproducts.map(item => (
                  <CardContent
                    // onPress={() => console.log(item)}
                    key={`children${item.id}shopId${item.shop_id}`}
                    color={appColors.white}
                    styles={[
                      global.shadow,
                      {
                        width: (appSize.width - 48) / 2,
                        marginBottom: 16,
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
                          item.is_addedtolist === 1
                            ? '#263238'
                            : appColors.primary,
                        borderRadius: 14,
                        position: 'absolute',
                        top: 10,
                        right: 10,
                      }}
                      icon={
                        item.is_addedtolist === 0 ? (
                          <Add size={24} color={appColors.white} />
                        ) : (
                          <AntDesign
                            name="check"
                            size={20}
                            color={appColors.white}
                          />
                        )
                      }
                      disable={item.is_addedtolist === 1}
                      onPress={async () =>
                        handleSwapItem({
                          product_id: parentItem.product_id,
                          shop_id: parentItem.shop_id,
                          swap_product_id: item.id,
                          swap_shop_id: item.shop_id,
                        })
                      }
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
                ))}
              </RowComponent>
            ))}
          </>
        )
      ) : (
        <LoadingComponent isLoading={isLoading} value={items.length} />
      )}

      <LoadingModal visible={isSwaping} />
    </View>
  );
};

export default SwapItemsComponent;
