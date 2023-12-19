import {
  AddSquare,
  ArrowDown2,
  ArrowUp2,
  Heart,
  Location,
  MinusSquare,
} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Product, ProductDetail} from '../Models/Product';
import handleGetData from '../apis/productAPI';
import {HeartBold} from '../assets/svg';
import {
  Button,
  ButtonComponent,
  ProductItemComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {fontFamilys} from '../constants/fontFamily';
import {authSelector} from '../redux/reducers/authReducer';
import {global} from '../styles/global';
import {showToast} from '../utils/showToast';
import ModalFoodScoreInfo from './ModalFoodScoreInfo';
import {SubscriptionModal} from '.';

interface Props {
  visible: boolean;
  onClose: () => void;
  product?: Product;
  onAddToList?: (count: number) => void;
  products: Product[];
  onReload?: () => void;
}

const ModalProduct = (props: Props) => {
  const {visible, onClose, product, onAddToList, products, onReload} = props;
  const [count, setCount] = useState(1);
  const [isShowModalFoodScoreInfo, setIsShowModalFoodScoreInfo] =
    useState(false);
  const [producDetail, setProducDetail] = useState<ProductDetail>();
  const [isShowDesc, setIsShowDesc] = useState(false);
  const [isShowIngre, setIsShowIngre] = useState(false);
  const [favouritesList, setFavouritesList] = useState<Product[]>([]);

  const auth = useSelector(authSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    getFavouritesList();
  }, []);

  useEffect(() => {
    visible ? modalRef.current?.open() : modalRef.current?.close();
  }, [visible]);

  useEffect(() => {
    getProducDetail();
  }, [product]);

  const modalRef = useRef<Modalize>();

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  const getProducDetail = async () => {
    const api = `/getProductDetail/${product?.id}`;

    try {
      await handleGetData.handleProduct(api).then((res: any) => {
        res.length > 0 && setProducDetail(res[0]);
      });
    } catch (error) {
      showToast(`Can not get product detail`);
      console.log(error);
    }
  };

  const categories = ['Gluten Free', 'Vegan', 'Organic'];

  const productIngredients = [
    {
      title: 'calories',
      desscription: '0',
      unit: 'g',
    },
    {
      title: 'carbohydrate',
      desscription: '3',
      unit: 'g',
    },
    {
      title: 'fat',
      desscription: '160',
      unit: 'g',
    },
    {
      title: 'protein',
      desscription: '3',
      unit: 'g',
    },
  ];

  const getFavouritesList = async () => {
    const api = `/listOfFavourites`;

    await handleGetData
      .handleProduct(api, {}, 'post')
      .then((res: any) => {
        res.length > 0 && setFavouritesList(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderProductIngredient = (
    item: {title: string; unit: string},
    index: number,
  ) => {
    const productIngre: any = producDetail;

    const value = productIngre ? productIngre[`${item.title}`] : [];

    return (
      <View
        key={`item${item.title}${index}`}
        style={{
          borderWidth: 1,
          borderColor: '#dbdbdb',
          marginBottom: 16,
          marginRight: 6,
          width: 56,
          height: 56,
          borderRadius: 100,
          backgroundColor: appColors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <RowComponent styles={{alignItems: 'flex-end'}}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: appColors.success1,
              marginRight: 2,
              marginBottom: 2,
            }}
          />
          <Text
            style={[
              global.text,
              {flex: 0, lineHeight: 16, fontFamily: fontFamilys.bold},
            ]}>
            {value ? (value * 1).toFixed(1) : 0}
            <Text style={{fontSize: 8}}>{item.unit}</Text>
          </Text>
        </RowComponent>

        <TextComponent
          text={item.title}
          flex={0}
          size={10}
          styles={{paddingHorizontal: 2}}
          line={1}
          color={appColors.gray}
        />
      </View>
    );
  };

  const renderCategory = (item: string, index: number) => (
    <TouchableOpacity
      style={[
        global.shadow,
        {
          backgroundColor: appColors.white,
          paddingHorizontal: 16,
          paddingVertical: 8,
          margin: 8,
          borderRadius: 100,
          elevation: 4,
        },
      ]}
      key={`cat${index}`}>
      <TextComponent text={item} flex={0} size={14} color={appColors.primary} />
    </TouchableOpacity>
  );

  const renderButtonAdd = () => {
    const item =
      products && products.length > 0
        ? products.find(element => element.product_id === product?.id)
        : undefined;

    return (
      <View
        style={{
          flex: 1,
        }}>
        <ButtonComponent
          disable={item ? true : false}
          disableColor="#B7B7B7"
          icon={
            item && (
              <FontAwesome5Icon
                name="check"
                size={18}
                color={appColors.white}
              />
            )
          }
          text={item ? 'Added' : 'Add to List'}
          onPress={
            onAddToList
              ? () => {
                  onAddToList(count);
                  handleCloseModal();
                }
              : () => console.log('add to list not yet')
          }
          textColor={item ? appColors.white : appColors.text}
        />
      </View>
    );
  };

  const renderFavouriestButton = () => {
    const item = favouritesList.find(
      (element: Product) => element.id === producDetail?.id,
    );
    return (
      producDetail && (
        <Button
          onPress={() =>
            item ? handleRemoveFavoritesItem(item) : handleAddFavoritesItem()
          }
          icon={
            item ? (
              <HeartBold width={24} height={24} />
            ) : (
              <Heart variant="Bold" color={appColors.white} size={24} />
            )
          }
        />
      )
    );
  };

  // console.log(favouritesList);

  const handleAddFavoritesItem = async () => {
    if (producDetail) {
      const api = `/addToFavourite`;

      await handleGetData
        .handleProduct(
          api,
          {
            product_id: producDetail?.id,
          },
          'post',
        )
        .then(res => {
          // console.log(res);
          showToast('Added');
          getFavouritesList();
        });
    }
  };

  const handleRemoveFavoritesItem = async (item: Product) => {
    const api = `/removeFavourites`;

    await handleGetData
      .handleProduct(
        api,
        {
          id: item.id,
        },
        'post',
      )
      .then(res => {
        showToast('Removed');
        getFavouritesList();
      });
  };

  return (
    <Portal>
      <Modalize
        onClose={() => {
          onClose();
          setCount(1);
          onReload && onReload();
        }}
        handlePosition="inside"
        ref={modalRef}
        adjustToContentHeight
        disableScrollIfPossible={false}
        FooterComponent={
          <View
            style={{
              backgroundColor: appColors.white,
              padding: 16,
            }}>
            <RowComponent>
              <RowComponent
                styles={{
                  flex: 1,
                }}>
                <RowComponent>
                  {count && count > 1 && (
                    <Button
                      icon={<MinusSquare size={22} color={appColors.text2} />}
                      onPress={() => setCount(count - 1)}
                    />
                  )}

                  <TextComponent
                    styles={{paddingHorizontal: 8}}
                    text={`${count} pcs`}
                    flex={0}
                    size={14}
                    color={appColors.text2}
                  />
                  <Button
                    icon={<AddSquare size={22} color={appColors.text2} />}
                    onPress={() => setCount(count ? count + 1 : 1)}
                  />
                </RowComponent>
              </RowComponent>
              {renderButtonAdd()}
            </RowComponent>
          </View>
        }
        handleStyle={{backgroundColor: 'transparent'}}
        modalStyle={{backgroundColor: appColors.bgColor, height: 'auto'}}
        scrollViewProps={{showsVerticalScrollIndicator: false}}>
        <ScrollView style={{backgroundColor: appColors.bgColor, flex: 1}}>
          {producDetail && producDetail.image && (
            <ImageBackground
              source={{
                uri: producDetail.image,
              }}
              style={{
                width: '100%',
                height: 180,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
              imageStyle={{
                resizeMode: 'cover',
              }}>
              <LinearGradient
                style={{height: 180, width: '100%'}}
                colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}>
                <RowComponent
                  justify="space-between"
                  styles={{padding: 16, paddingTop: 20}}>
                  <Button
                    icon={
                      <AntDesign
                        name="close"
                        color={appColors.white}
                        size={22}
                      />
                    }
                    onPress={handleCloseModal}
                  />
                  {renderFavouriestButton()}
                </RowComponent>
                <View style={{flex: 1}} />
                <RowComponent justify="space-between" styles={{padding: 16}}>
                  <RowComponent
                    styles={{
                      backgroundColor: '#41393E70',
                      flex: 0,
                      borderRadius: 100,
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                    }}>
                    <Location size={14} color={appColors.white} />
                    <SpaceComponent width={4} />
                    <TextComponent
                      text="Walmart"
                      color={appColors.white}
                      flex={0}
                      size={12}
                    />
                  </RowComponent>
                  <RowComponent
                    styles={{
                      backgroundColor: '#41393E70',
                      flex: 0,
                      borderRadius: 100,
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                    }}>
                    <TextComponent
                      text="1 / 25"
                      color={appColors.white}
                      flex={0}
                      size={12}
                    />
                  </RowComponent>
                </RowComponent>
              </LinearGradient>
            </ImageBackground>
          )}

          <View style={{flex: 1}}>
            <SectionComponent styles={{marginTop: 20}}>
              {producDetail && (
                <RowComponent styles={{alignItems: 'flex-start'}}>
                  <TitleComponent
                    text={producDetail.name}
                    size={20}
                    height={20}
                  />
                  <SpaceComponent width={24} />
                  <TextComponent
                    text={`$ ${producDetail.price}`}
                    flex={0}
                    size={16}
                  />
                </RowComponent>
              )}
            </SectionComponent>

            <RowComponent styles={{paddingLeft: 16}}>
              <>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: '#E6EECC',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    marginRight: 6,
                  }}>
                  <TextComponent text="👍" size={20} flex={0} />
                  <Button
                    styles={{
                      position: 'absolute',
                      top: 0,
                      right: 2,
                    }}
                    onPress={() => setIsShowModalFoodScoreInfo(true)}
                    icon={
                      <MaterialIcons name="info" size={20} color={'#9F9F9F'} />
                    }
                  />
                </View>
              </>

              <View style={{flex: 1}}>
                {auth.is_premium === 0 ? (
                  <RowComponent
                    styles={{
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      marginLeft: 12,
                    }}>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        backgroundColor: appColors.primary,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 8,
                      }}>
                      <Fontisto
                        name="locked"
                        size={14}
                        color={appColors.white}
                      />
                    </View>
                    <RowComponent
                      styles={{
                        flex: 1,
                        flexWrap: 'nowrap',
                        overflow: 'hidden',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                      }}>
                      <TextComponent
                        text="Upgrade to Premium "
                        font={fontFamilys.bold}
                        styles={{textDecorationLine: 'underline'}}
                        flex={0}
                      />
                      <TextComponent
                        text="for full food ratings"
                        font={fontFamilys.bold}
                        flex={0}
                      />
                    </RowComponent>
                  </RowComponent>
                ) : (
                  <RowComponent>
                    {productIngredients.map((item, index) =>
                      renderProductIngredient(item, index),
                    )}
                  </RowComponent>
                )}
              </View>
            </RowComponent>

            <FlatList
              style={{paddingHorizontal: 8, paddingBottom: 12}}
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => renderCategory(item, index)}
            />

            <SectionComponent>
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
              {product && (
                <RowComponent justify="space-between">
                  {Array.from({length: 2}).map((_item, index) => (
                    <ProductItemComponent
                      isCheckPremium
                      item={product}
                      key={`item.id${index}`}
                    />
                  ))}
                </RowComponent>
              )}
            </SectionComponent>

            <SectionComponent>
              <RowComponent>
                <RowComponent styles={{flex: 1}} justify="flex-start">
                  <TitleComponent
                    text="Product Description"
                    size={20}
                    flex={0}
                  />
                  <SpaceComponent width={8} />
                  <Button
                    icon={
                      <AntDesign
                        name="infocirlceo"
                        size={18}
                        color={appColors.gray}
                      />
                    }
                    onPress={() => {}}
                  />
                </RowComponent>
                <Button
                  icon={
                    isShowDesc ? (
                      <ArrowUp2 size={22} color={appColors.text2} />
                    ) : (
                      <ArrowDown2 size={22} color={appColors.text2} />
                    )
                  }
                  onPress={() => setIsShowDesc(!isShowDesc)}
                />
              </RowComponent>

              {producDetail?.description && isShowDesc && (
                <TextComponent
                  text={producDetail?.description ?? ''}
                  flex={1}
                />
              )}
            </SectionComponent>
            <SectionComponent>
              <RowComponent>
                <RowComponent styles={{flex: 1}} justify="flex-start">
                  <TitleComponent text="Ingredients" size={20} flex={0} />
                  <SpaceComponent width={8} />
                  <Button
                    icon={
                      <AntDesign
                        name="infocirlceo"
                        size={18}
                        color={appColors.gray}
                      />
                    }
                    onPress={() => {}}
                  />
                </RowComponent>
                <Button
                  icon={
                    isShowIngre ? (
                      <ArrowUp2 size={22} color={appColors.text2} />
                    ) : (
                      <ArrowDown2 size={22} color={appColors.text2} />
                    )
                  }
                  onPress={() => setIsShowIngre(!isShowIngre)}
                />
              </RowComponent>
              {producDetail?.ingridients && isShowIngre && (
                <View style={{marginTop: 8}}>
                  {producDetail.ingridients.split(', ').map((item, index) => (
                    <TextComponent
                      text={item}
                      key={`ingre${index}`}
                      styles={{textTransform: 'capitalize', marginBottom: 12}}
                    />
                  ))}
                </View>
              )}
            </SectionComponent>
          </View>
        </ScrollView>
      </Modalize>

      <ModalFoodScoreInfo
        visible={isShowModalFoodScoreInfo}
        onClose={() => setIsShowModalFoodScoreInfo(false)}
      />
    </Portal>
  );
};

export default ModalProduct;
