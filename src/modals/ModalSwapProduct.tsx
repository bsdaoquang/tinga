import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Modal, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  ButtonComponent,
  CardContent,
  RowComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {global} from '../styles/global';
import handleGetData from '../apis/productAPI';
import {showToast} from '../utils/showToast';
import {ProductDetail, Swapproduct} from '../Models/Product';
import {appSize} from '../constants/appSize';
import {Location} from 'iconsax-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LoadingModal from './LoadingModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  addGroceryList,
  groceriesSelector,
} from '../redux/reducers/groceryReducer';
import {HandleGrocery} from '../utils/handleGrocery';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  product?: any;
  swapProduct?: ProductDetail;
}

const ModalSwapProduct = (props: Props) => {
  const {isVisible, onClose, product, swapProduct} = props;
  const [isSwaping, setIsSwaping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productDetail, setproductDetail] = useState<ProductDetail>();

  const groceryList: ProductDetail[] = useSelector(groceriesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product && product.image) {
      setproductDetail(product);
    } else {
      getProducDetail();
    }
  }, [product]);

  const getProducDetail = async () => {
    if (product) {
      const api = `/getDetailProduct?id=${product?.product_id}&shop_id=${product?.shop_id}`;

      try {
        const res: any = await handleGetData.handleProduct(api);
        res && res.length > 0 && setproductDetail(res[0]);
      } catch (error) {
        showToast(`Can not get product detail`);
        console.log(error);
      }
    }
  };

  const handleSwapItem = async () => {
    const items = [...groceryList];

    if (productDetail && swapProduct) {
      const index = items.findIndex(
        element =>
          element.id === productDetail?.id &&
          element.shop_id === productDetail.shop_id,
      );

      if (index !== -1) {
        // console.log(swapProduct);
        setIsSwaping(true);
        items[index] = swapProduct;

        dispatch(addGroceryList(items));
        setIsSwaping(false);
        onClose();
      } else {
        showToast('Product swap not found');
        getProducDetail();
      }
    } else {
      showToast('Swap product not found');
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

  const renderCardItem = (item: Swapproduct) => (
    <CardContent
      color={appColors.white}
      styles={[
        global.shadow,
        {
          width: (appSize.width - 48) / 2,
          padding: 0,
          marginBottom: 20,
        },
      ]}>
      <Image
        source={{uri: item.image}}
        resizeMode="cover"
        style={{
          height: 100,
          width: 'auto',
        }}
      />

      <View style={{padding: 10}}>
        <TextComponent text={`$ ${item.price}`} size={12} />
        <TextComponent
          text={item.name}
          size={12}
          line={2}
          styles={{minHeight: 30}}
          flex={0}
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
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={[global.modalContainer]}>
        <View style={[global.modalContent]}>
          <RowComponent>
            <View style={{flex: 1}}>
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
            </View>

            <Button
              onPress={onClose}
              icon={<AntDesign name="close" size={24} color={appColors.text} />}
              fontStyles={{fontSize: 14, color: appColors.primary}}
            />
          </RowComponent>

          {isLoading ? (
            <ActivityIndicator />
          ) : (
            swapProduct &&
            productDetail && (
              <>
                <View
                  style={{
                    paddingVertical: 22,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {renderCardItem(productDetail)}

                  <Entypo
                    size={28}
                    color={appColors.success1}
                    name="arrow-down"
                    style={{marginBottom: 22}}
                  />

                  {renderCardItem(swapProduct)}
                </View>

                <ButtonComponent
                  text="Swap Product"
                  textColor="white"
                  onPress={handleSwapItem}
                  disable={isSwaping}
                />
              </>
            )
          )}
        </View>
      </View>
      <LoadingModal visible={isSwaping} />
    </Modal>
  );
};

export default ModalSwapProduct;
