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
import {Nutrition, Product, ProductDetail} from '../Models/Product';
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
import RenderHTML from 'react-native-render-html';
import {appSize} from '../constants/appSize';

interface Props {
  visible: boolean;
  onClose: () => void;
  product?: Product;
  onAddToList?: (count: number, shop_id: number) => void;
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
  const [swapItem, setSwapItem] = useState<Product[]>([]);
  const [isShowSwapItems, setIsShowSwapItems] = useState(false);

  const auth = useSelector(authSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    // getFavouritesList();
  }, []);

  useEffect(() => {
    visible ? modalRef.current?.open() : modalRef.current?.close();
  }, [visible]);

  useEffect(() => {
    if (visible && product) {
      getProducDetail();
      getSwapItems();
    }
  }, [product, visible]);

  const modalRef = useRef<Modalize>();

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  const getSwapItems = async () => {
    const api = `/tingaSwap`;
    try {
      const res: any = await handleGetData.handleProduct(
        api,
        {
          product_id: product?.id,
          shop_id: product?.shop_id,
        },
        'post',
      );

      res && res.length > 0 && setSwapItem(res);
    } catch (error) {
      console.log(`Can not get swap items by ${error}`);
    }
  };

  const getProducDetail = async () => {
    const api = `/getDetailProduct?id=${product?.id}&shop_id=${product?.shop_id}`;

    try {
      const res: any = await handleGetData.handleProduct(api);

      res && res.length > 0 && setProducDetail(res[0]);
    } catch (error) {
      showToast(`Can not get product detail`);
      console.log(error);
    }
  };

  const getFavouritesList = async () => {
    // const api = `/listOfFavourites`;
    // await handleGetData
    //   .handleProduct(api, {}, 'post')
    //   .then((res: any) => {
    //     res.length > 0 && setFavouritesList(res);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  const renderProductIngredient = (itemNutri: any) => {
    const items: string[] = [];
    for (const i in itemNutri) {
      !i.includes('_color') && items.push(i);
    }

    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={items}
        renderItem={({item, index}) => (
          <View
            key={`item${item}${index}`}
            style={{
              borderWidth: 1,
              borderColor: '#dbdbdb',
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
                  backgroundColor: itemNutri[`${item}_color`],
                  marginRight: 2,
                  marginBottom: 2,
                }}
              />
              <Text
                style={[
                  global.text,
                  {
                    flex: 0,
                    lineHeight: 16,
                    fontFamily: fontFamilys.bold,
                    fontSize: 14,
                  },
                ]}
                numberOfLines={1}>
                {itemNutri[`${item}`]}
              </Text>
            </RowComponent>

            <TextComponent
              text={item}
              flex={0}
              size={10}
              styles={{paddingHorizontal: 2}}
              line={1}
              color={appColors.gray}
            />
          </View>
        )}
      />
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

  useEffect(() => {
    if (visible && producDetail) {
      console.log(product);
      console.log(producDetail);
    }
  }, [visible, product, producDetail]);

  const renderButtonAdd = () => {
    return (
      producDetail && (
        <View
          style={{
            flex: 1,
          }}>
          <ButtonComponent
            disable={producDetail?.is_addedtolist === 1 ? true : false}
            disableColor="#B7B7B7"
            icon={
              producDetail?.is_addedtolist === 1 && (
                <FontAwesome5Icon
                  name="check"
                  size={18}
                  color={appColors.white}
                />
              )
            }
            text={producDetail?.is_addedtolist === 1 ? 'Added' : 'Add to List'}
            onPress={
              onAddToList
                ? () => {
                    onAddToList(count, producDetail.shop_id);
                    handleCloseModal();
                  }
                : () => console.log('add to list not yet')
            }
            textColor={
              producDetail?.is_addedtolist === 1
                ? appColors.white
                : appColors.text
            }
          />
        </View>
      )
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

  const tagsStyles: any = {
    body: {
      fontFamily: 'GreycliffCF-Regular',
      whiteSpace: 'normal',
      color: appColors.text,
      lineHeight: 19,
    },
  };

  const renderThumbType = () => {
    return (
      <View>
        <View
          style={{
            width: 56,
            height: 56,
            backgroundColor: `${producDetail?.thumb_color}`,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            marginRight: 6,
            transform:
              producDetail?.thumb_type === 'Bad' ? 'rotate(180deg)' : '',
          }}>
          <Text style={{fontSize: 18, color: '#FFD97D'}}>
            {producDetail?.thumb_type === 'Normal' ? '👌' : `👍`}
          </Text>
        </View>
        <Button
          styles={{
            position: 'absolute',
            top: 0,
            right: 2,
            backgroundColor: appColors.white,
            borderRadius: 100,
          }}
          onPress={() => setIsShowModalFoodScoreInfo(true)}
          icon={<MaterialIcons name="info" size={20} color={appColors.gray} />}
        />
      </View>
    );
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
                    text={`${count} ct`}
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
          {producDetail && producDetail.image ? (
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
          ) : (
            <View
              style={{
                width: '100%',
                height: 250,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            />
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

            <RowComponent styles={{paddingLeft: 16, marginBottom: 16}}>
              <>{renderThumbType()}</>

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
                  <>{renderProductIngredient(producDetail?.nutrition[0])}</>
                )}
              </View>
            </RowComponent>

            <FlatList
              style={{paddingHorizontal: 8, paddingBottom: 12}}
              data={producDetail?.diets.concat(producDetail.allergies)}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => renderCategory(item.name, index)}
            />

            <SectionComponent>
              <RowComponent
                styles={{
                  alignItems: 'flex-start',
                  paddingVertical: 12,
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

                <RowComponent
                  onPress={() => setIsShowSwapItems(!isShowSwapItems)}>
                  <TextComponent
                    flex={0}
                    text="View All"
                    styles={{fontSize: 14, color: appColors.primary}}
                  />
                  {!isShowSwapItems ? (
                    <ArrowDown2 size={20} color={appColors.primary} />
                  ) : (
                    <ArrowUp2 size={20} color={appColors.primary} />
                  )}
                </RowComponent>
              </RowComponent>
              {swapItem.length > 0 && isShowSwapItems && (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={swapItem}
                  keyExtractor={(item, index) =>
                    `Product${item.id}${item.shop_id}`
                  }
                  renderItem={({item}) => (
                    <View style={{marginRight: 16}}>
                      <ProductItemComponent isCheckPremium item={item} />
                    </View>
                  )}
                />
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
                <RenderHTML
                  source={{html: producDetail.description}}
                  contentWidth={appSize.width}
                  tagsStyles={tagsStyles}
                  ignoredStyles={['fontFamily', 'fontSize']}
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
