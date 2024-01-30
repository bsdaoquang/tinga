import {
  AddSquare,
  ArrowDown2,
  ArrowUp2,
  Heart,
  Location,
  MinusSquare,
} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, ImageBackground, ScrollView, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import RenderHTML from 'react-native-render-html';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {ProductDetail} from '../Models/Product';
import handleGetData from '../apis/productAPI';
import {HeartBold} from '../assets/svg';
import {
  Button,
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import SwapItemsComponent from '../components/SwapItemsComponent';
import {appColors} from '../constants/appColors';
import {appSize} from '../constants/appSize';
import {fontFamilys} from '../constants/fontFamily';
import {authSelector} from '../redux/reducers/authReducer';
import {
  groceriesSelector,
  updateGroceryList,
} from '../redux/reducers/groceryReducer';
import {global} from '../styles/global';
import {showToast} from '../utils/showToast';
import ModalFoodScoreInfo from './ModalFoodScoreInfo';

interface Props {
  visible: boolean;
  onClose: () => void;
  product?: any;
  isScan?: boolean;
  onReload?: () => void;
  hideBottom?: boolean;
}

const tagsStyles: any = {
  body: {
    fontFamily: 'GreycliffCF-Regular',
    whiteSpace: 'normal',
    color: appColors.text,
    lineHeight: 19,
  },
};

const ModalProduct = (props: Props) => {
  const {visible, onClose, product, isScan, onReload, hideBottom} = props;
  const [count, setCount] = useState(1);
  const [isShowModalFoodScoreInfo, setIsShowModalFoodScoreInfo] =
    useState(false);
  const [producDetail, setProducDetail] = useState<ProductDetail>();
  const [isShowDesc, setIsShowDesc] = useState(true);
  const [isShowIngre, setIsShowIngre] = useState(true);
  const [isFavoured, setIsFavoured] = useState(true);
  const [isShowNutrients, setIsShowNutrients] = useState(true);
  const [dietsTitles, setDietsTitles] = useState<string[]>([]);
  const [data, setdata] = useState<{
    product_id: number;
    shop_id: number;
  }>();
  const auth = useSelector(authSelector);
  const groceryList: ProductDetail[] = useSelector(groceriesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    visible ? modalRef.current?.open() : modalRef.current?.close();
  }, [visible]);

  useEffect(() => {
    if (visible && product) {
      setdata({
        product_id: product?.id,
        shop_id: product?.shop_id,
      });
      getProducDetail(product.id, product.shop_id);
    }
  }, [product, visible]);

  useEffect(() => {
    data && handleCheckFavouredList();
  }, [data]);

  useEffect(() => {
    const items: string[] = [];
    if (producDetail) {
      producDetail.notallergyfree.length > 0 &&
        isScan &&
        producDetail.notallergyfree.forEach(item =>
          items.push(`${item}.isRed`),
        );
      producDetail.diets.length > 0 &&
        producDetail.diets.forEach(item => items.push(item.name));
      producDetail.allergies.length > 0 &&
        producDetail.allergies.forEach(item => items.push(item));

      setDietsTitles(items);
    }
  }, [producDetail]);

  const modalRef = useRef<Modalize>();

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  const getProducDetail = async (id: number, shop_id: number) => {
    if (product) {
      const api = `/getDetailProduct?id=${id}&shop_id=${shop_id}`;
      try {
        const res: any = await handleGetData.handleProduct(api);

        res && res.length > 0 && setProducDetail(res[0]);
      } catch (error) {
        showToast(`Can not get product detail`);
        console.log(error);
      }
    }
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
    <RowComponent
      styles={[
        global.shadow,
        {
          backgroundColor: item.includes(`.isRed`)
            ? '#F5E6E6'
            : appColors.white,
          paddingHorizontal: 16,
          paddingVertical: 8,
          margin: 8,
          borderRadius: 100,
          elevation: 4,
        },
      ]}
      key={`cat${index}`}>
      {item.includes('.isRed') && (
        <Ionicons
          name="warning"
          size={14}
          color={'#C63232'}
          style={{marginRight: 4}}
        />
      )}
      <TextComponent
        text={item.includes('.isRed') ? item.split('.')[0] : item}
        flex={0}
        size={14}
        color={item.includes('.isRed') ? '#C63232' : appColors.primary}
      />
    </RowComponent>
  );

  const renderButtonAdd = () => {
    const index = groceryList.findIndex(
      element =>
        element.id === producDetail?.id &&
        element.shop_id === producDetail.shop_id,
    );

    return hideBottom ? (
      <></>
    ) : (
      producDetail && (
        <>
          {index !== -1 ? (
            <View style={{flex: 1, alignItems: 'center'}}>
              <TextComponent
                styles={{paddingHorizontal: 8}}
                text={`${groceryList[index].qty} ct`}
                flex={0}
                size={14}
                color={appColors.text2}
              />
            </View>
          ) : (
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
          )}
          <View
            style={{
              flex: 1,
            }}>
            <ButtonComponent
              disable={index !== -1 ? true : false}
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
              text={index !== -1 ? 'Added' : 'Add to List'}
              onPress={() => {
                const data: ProductDetail = {...producDetail};
                data.qty = count;

                dispatch(updateGroceryList(data));
              }}
              textColor={index !== -1 ? appColors.white : appColors.text}
            />
          </View>
        </>
      )
    );
  };

  const renderFavouriestButton = () => {
    return (
      producDetail && (
        <Button
          onPress={() =>
            isFavoured ? handleRemoveFavoritesItem() : handleAddFavoritesItem()
          }
          icon={
            isFavoured ? (
              <HeartBold width={24} height={24} />
            ) : (
              <Heart variant="Bold" color={appColors.white} size={24} />
            )
          }
        />
      )
    );
  };

  const handleCheckFavouredList = async () => {
    const api = `/isFavouritelist`;
    try {
      const res: any = await handleGetData.handleProduct(api, data, 'post');
      res && res.success && setIsFavoured(res.message);
    } catch (error) {
      console.log(`Can not check favoured list by ${error}`);
    }
  };

  const handleAddFavoritesItem = async () => {
    const api = `/addToFavouritelist`;
    try {
      await handleGetData.handleProduct(api, data, 'post');
      handleCheckFavouredList();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFavoritesItem = async () => {
    const api = `/removeFavouritelist`;

    try {
      await handleGetData.handleProduct(api, data, 'post');
      handleCheckFavouredList();
    } catch (error) {
      console.log(error);
    }
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
            <RowComponent>{renderButtonAdd()}</RowComponent>
          </View>
        }
        handleStyle={{backgroundColor: 'transparent'}}
        modalStyle={{backgroundColor: appColors.bgColor, height: 'auto'}}
        scrollViewProps={{showsVerticalScrollIndicator: false}}>
        <ScrollView style={{backgroundColor: appColors.bgColor, flex: 1}}>
          {producDetail && producDetail.image ? (
            <ImageBackground
              source={{
                uri: producDetail?.image,
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
                      text={producDetail.shopname}
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
              data={dietsTitles}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => renderCategory(item, index)}
            />

            <SectionComponent>
              <SwapItemsComponent
                product={producDetail}
                onSwapItem={val => {
                  setCount(1);
                  getProducDetail(val.id, val.shop_id);
                }}
              />
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
            {producDetail && producDetail?.nutritent && (
              <SectionComponent>
                <RowComponent styles={{flex: 1}} justify="space-between">
                  <TitleComponent text="Nutrients" size={20} flex={0} />

                  <Button
                    icon={
                      isShowNutrients ? (
                        <ArrowUp2 size={22} color={appColors.text2} />
                      ) : (
                        <ArrowDown2 size={22} color={appColors.text2} />
                      )
                    }
                    onPress={() => setIsShowNutrients(!isShowNutrients)}
                  />
                </RowComponent>
                <TextComponent
                  text={producDetail.nutrient_disclaimer}
                  color={appColors.text2}
                />
                <SpaceComponent height={12} />

                <RowComponent justify="flex-end">
                  <TextComponent
                    text={`Per ${producDetail.serving_size} (${producDetail.size})`}
                    font={fontFamilys.bold}
                    flex={0}
                  />
                </RowComponent>
                <View>
                  <RenderHTML
                    source={{html: producDetail?.nutritent}}
                    contentWidth={appSize.width}
                    tagsStyles={{
                      ...tagsStyles,
                      th: {
                        borderWidth: 0.5,
                        borderColor: appColors.gray,
                        padding: 8,
                        paddingVertical: 10,
                      },
                      td: {
                        padding: 6,
                        borderWidth: 0.5,
                        borderColor: appColors.gray,
                      },
                    }}
                    ignoredStyles={['fontFamily', 'fontSize']}
                  />
                </View>
              </SectionComponent>
            )}
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
