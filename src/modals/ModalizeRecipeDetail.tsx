import {useNavigation} from '@react-navigation/native';
import {
  Add,
  ArrowDown2,
  ArrowUp2,
  Danger,
  Heart,
  Location,
} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {ModalProduct} from '.';
import {ProductDetail} from '../Models/Product';
import {
  ProductStore,
  Recipe,
  RecipeDetail,
  RecipeIngredient,
} from '../Models/Recipe';
import handleMealApi from '../apis/mealplannerAPI';
import {
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import LoadingDotComponent from '../components/LoadingDotComponent';
import {appColors} from '../constants/appColors';
import {appSize} from '../constants/appSize';
import {fontFamilys} from '../constants/fontFamily';
import {
  groceriesSelector,
  updateGroceryList,
} from '../redux/reducers/groceryReducer';
import {global} from '../styles/global';
import {showToast} from '../utils/showToast';
import LoadingModal from './LoadingModal';
import ModalFoodScoreInfo from './ModalFoodScoreInfo';
import {
  addFavouries,
  favouritesSelector,
  updateFavourites,
} from '../redux/reducers/favouritesReducer';

interface Props {
  visible: boolean;
  onClose: () => void;
  item?: Recipe;
  onReload?: () => void;
}

const ModalizeRecipeDetail = (props: Props) => {
  const {visible, onClose, item, onReload} = props;

  const [isVisibleIngredients, setIsVisibleIngredients] = useState(true);
  const [isPrepareIngredients, setIsPrepareIngredients] = useState(true);
  const [isShowIntroductions, setIsShowIntroductions] = useState(true);
  const [isVisibleModalScore, setIsVisibleModalScore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeDetail, setRecipeDetail] = useState<RecipeDetail>();
  const [recipeIngredients, setRecipeIngredients] =
    useState<RecipeIngredient>();
  const [isUpdate, setIsUpdate] = useState(false);
  const [productSelected, setProductSelected] = useState<ProductStore[]>([]);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(false);
  const [isVisibileModalProduct, setIsVisibileModalProduct] = useState(false);
  const [ProductDetail, setProductDetail] = useState<any>();

  const groceryList: ProductDetail[] = useSelector(groceriesSelector);
  const dispatch = useDispatch();
  const modalRef = useRef<Modalize>();
  const navigation: any = useNavigation();
  const favourites: Recipe[] = useSelector(favouritesSelector);

  useEffect(() => {
    if (visible) {
      modalRef.current?.open();

      if (item) {
        getRecipeDetailById();
        getIngredientItems();
      }
    } else {
      modalRef.current?.close();
    }
  }, [visible, item]);

  const getRecipeDetailById = async () => {
    if (item) {
      const api = `recipeDetails?recipe_id=${item.id}`;
      setIsLoading(true);

      try {
        const res: any = await handleMealApi.handleMealPlanner(api);
        res && setRecipeDetail(res);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  const getIngredientItems = async () => {
    const api = `recipeIngredients?recipe_id=${item?.id}`;
    setIsLoadingIngredients(true);
    try {
      const res: any = await handleMealApi.handleMealPlanner(api);

      if (res) {
        setRecipeIngredients(res);
      }
      setIsLoadingIngredients(false);
    } catch (error) {
      console.log(error);
      setIsLoadingIngredients(false);
    }
  };

  const handleCloseModal = () => {
    modalRef.current?.close();
    setProductSelected([]);
  };

  const handleToggleProductSelected = (item: ProductStore) => {
    const items = [...productSelected];
    const index = items.findIndex(element => element.id === item.id);
    if (index !== -1) {
      items.splice(index, 1);
    } else {
      items.push(item);
    }

    setProductSelected(items);
  };

  const handleAddMoultiProduct = async () => {
    productSelected.forEach((product, index) => {
      dispatch(updateGroceryList(product));
    });
    setProductSelected([]);
    getIngredientItems();
  };

  const renderProductItem = (item: ProductStore) => {
    const indexOfGrocery = groceryList.findIndex(
      element => element.id === item.id && element.shop_id === item.shop_id,
    );

    return (
      <TouchableOpacity
        onPress={() => {
          setProductDetail(item);
          setIsVisibileModalProduct(true);
        }}
        key={item.id}
        style={[
          global.shadow,
          {
            width: (appSize.width - 64) / 2,
            height: 170,
            marginBottom: 16,
          },
        ]}>
        {item.image ? (
          <FastImage
            source={{uri: item.image}}
            style={{
              width: '100%',
              flex: 1,
              height: 96,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <View
            style={{
              flex: 1.5,
              backgroundColor: appColors.gray,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="image-outline" size={28} color={'#b1b1b1'} />
          </View>
        )}

        <View
          style={{
            backgroundColor: appColors.white,
            padding: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}>
          <TextComponent text={`$ ${item.price}`} size={12} height={16} />
          <TextComponent
            text={item.name}
            styles={{marginVertical: 4}}
            size={12}
            flex={0}
            line={1}
            height={16}
          />
          <RowComponent justify="space-between">
            <RowComponent>
              <Location size={10} color={appColors.gray} />
              <SpaceComponent width={4} />
              <TextComponent
                text={item.shop_name ?? ''}
                flex={0}
                size={10}
                color={appColors.gray}
              />
            </RowComponent>

            <View
              style={[
                global.rowCenter,
                {
                  width: 18,
                  height: 18,
                  backgroundColor:
                    item.thumb_type === 1
                      ? '#FFECBF'
                      : item.thumb_type === 2
                      ? '#FFECBF'
                      : '#FFDBDB',
                  borderRadius: 100,
                  transform: item.thumb_type === 3 ? 'rotate(180deg)' : '',
                },
              ]}>
              <TextComponent
                text={item.thumb_type === 2 ? '👌' : '👍'}
                size={9}
                flex={0}
              />
            </View>
          </RowComponent>
        </View>

        <TouchableOpacity
          disabled={indexOfGrocery !== -1}
          onPress={() => handleToggleProductSelected(item)}
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            backgroundColor:
              indexOfGrocery !== -1 || productSelected.includes(item)
                ? '#263238'
                : appColors.success2,
            borderRadius: 100,
            width: 28,
            height: 28,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {indexOfGrocery !== -1 || productSelected.includes(item) ? (
            <Ionicons
              name="checkmark-sharp"
              size={20}
              color={appColors.white}
            />
          ) : (
            <Add size={26} color={appColors.white} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Portal>
        <Modalize
          avoidKeyboardLikeIOS
          onClose={onClose}
          ref={modalRef}
          // adjustToContentHeight
          handlePosition="inside"
          modalStyle={{
            backgroundColor: appColors.bgColor,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
          disableScrollIfPossible={false}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          HeaderComponent={
            <RowComponent
              justify="space-between"
              styles={{
                padding: 20,
                backgroundColor: appColors.success2,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}>
              <TouchableOpacity onPress={() => handleCloseModal()}>
                <AntDesign name="close" color={appColors.white} size={22} />
              </TouchableOpacity>
              {item && (
                <TouchableOpacity
                  onPress={() => dispatch(updateFavourites(item))}>
                  <Heart
                    variant={
                      favourites.findIndex(
                        element => element.id === item.id,
                      ) !== -1
                        ? 'Bold'
                        : 'Outline'
                    }
                    color={appColors.white}
                    size={24}
                  />
                </TouchableOpacity>
              )}
            </RowComponent>
          }
          FooterComponent={
            !isLoading ? (
              productSelected.length > 0 && (
                <RowComponent
                  styles={{
                    padding: 12,
                    paddingHorizontal: 16,
                    backgroundColor: appColors.white,
                    paddingBottom: 20,
                  }}>
                  <View style={{flex: 1}}>
                    <ButtonComponent
                      color={appColors.success1}
                      styles={{
                        paddingVertical: 15,
                      }}
                      textColor={appColors.text}
                      text={`Add ${productSelected.length} Ingredients to List`}
                      onPress={handleAddMoultiProduct}
                    />
                  </View>
                  <RowComponent
                    onPress={() => {
                      setProductSelected([]);
                      modalRef.current?.close();

                      navigation.navigate('Grocery List', {
                        screen: 'GroceryScreen',
                      });
                    }}
                    styles={{
                      marginLeft: 12,
                      backgroundColor: appColors.primary,
                      borderRadius: 12,
                      padding: 15,
                    }}>
                    <FontAwesome5
                      name="shopping-cart"
                      color={appColors.white}
                    />
                    <SpaceComponent width={6} />
                    <TitleComponent
                      text={`${groceryList.reduce(
                        (a, b) => a + (b.qty ? b.qty : 1),
                        0,
                      )}`}
                      flex={0}
                      color={appColors.white}
                      font={fontFamilys.bold}
                      size={18}
                    />
                  </RowComponent>
                </RowComponent>
              )
            ) : (
              <></>
            )
          }
          handleStyle={{backgroundColor: appColors.gray}}>
          {item && (
            <ScrollView>
              <View
                style={{
                  backgroundColor: appColors.success2,
                  padding: 20,
                }}>
                <TitleComponent
                  text={item.meal_title}
                  flex={1}
                  size={24}
                  color={appColors.white}
                  line={2}
                />

                <TextComponent
                  styles={{paddingVertical: 8}}
                  color={appColors.white}
                  text={`${item.cook_time} · Serves ${item.noservings} · ${item.type}`}
                  line={22}
                  flex={0}
                />
              </View>

              <View
                style={{
                  padding: 20,
                  backgroundColor: appColors.bgColor,
                  flex: 1,
                  height: 'auto',
                }}>
                {isLoading ? (
                  <LoadingDotComponent />
                ) : recipeDetail ? (
                  <>
                    {recipeIngredients?.allergyfree && (
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={recipeIngredients.allergyfree}
                        renderItem={({item, index}) => (
                          <View
                            key={`allergyfree${index}`}
                            style={[
                              global.shadow,
                              global.button,
                              {
                                borderRadius: 100,
                                height: 40,
                                paddingVertical: 0,
                                backgroundColor: appColors.white,
                                marginBottom: 12,
                                marginHorizontal: 4,
                              },
                            ]}>
                            <TextComponent
                              text={item}
                              flex={0}
                              color={appColors.success2}
                            />
                          </View>
                        )}
                      />
                    )}

                    {recipeIngredients?.notallergyfree && (
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={recipeIngredients.notallergyfree}
                        renderItem={({item, index}) => (
                          <RowComponent
                            key={`allergyfree${index}`}
                            styles={[
                              global.shadow,

                              {
                                borderRadius: 100,
                                marginBottom: 12,
                                backgroundColor: `#F5E6E6`,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: 8,
                                paddingHorizontal: 16,
                                marginRight: 8,
                              },
                            ]}>
                            <Danger
                              variant="Bold"
                              size={20}
                              color={appColors.error2}
                            />
                            <SpaceComponent width={8} />
                            <TextComponent
                              text={item}
                              flex={0}
                              color={appColors.error}
                            />
                          </RowComponent>
                        )}
                      />
                    )}
                    <View style={{paddingTop: 16}}>
                      <TextComponent
                        styles={{textAlign: 'justify'}}
                        text={recipeDetail?.description}
                      />
                    </View>
                    {recipeIngredients && (
                      <View style={{paddingTop: 16}}>
                        {isVisibleIngredients && (
                          <>
                            {isLoadingIngredients ? (
                              <LoadingDotComponent mess="Searching for products" />
                            ) : (
                              recipeIngredients.instore &&
                              recipeIngredients.instore.length > 0 && (
                                <>
                                  <RowComponent styles={{marginBottom: 8}}>
                                    <TitleComponent
                                      text="Ingredients"
                                      size={20}
                                    />

                                    <TouchableOpacity
                                      onPress={() =>
                                        setIsVisibleIngredients(
                                          !isVisibleIngredients,
                                        )
                                      }>
                                      {isVisibleIngredients ? (
                                        <ArrowUp2
                                          size={24}
                                          color={appColors.text2}
                                        />
                                      ) : (
                                        <ArrowDown2
                                          size={24}
                                          color={appColors.text2}
                                        />
                                      )}
                                    </TouchableOpacity>
                                  </RowComponent>
                                  <TextComponent
                                    text="Note: Check ingredient quantities before adding to your list."
                                    size={12}
                                  />

                                  <RowComponent justify="space-between">
                                    {recipeIngredients.instore &&
                                      recipeIngredients.instore.length > 0 &&
                                      recipeIngredients.instore.map(
                                        (item, index) =>
                                          renderProductItem(item),
                                      )}
                                  </RowComponent>
                                </>
                              )
                            )}

                            <View style={{paddingTop: 16}}>
                              {isLoadingIngredients ? (
                                <LoadingDotComponent mess="" />
                              ) : (
                                recipeIngredients.ingrocerylist &&
                                recipeIngredients.ingrocerylist.length > 0 && (
                                  <>
                                    <TitleComponent
                                      text="Ingredients you may already have"
                                      size={20}
                                    />
                                    <RowComponent justify="space-between">
                                      {recipeIngredients?.ingrocerylist.map(
                                        (item, index) =>
                                          renderProductItem(item),
                                      )}
                                    </RowComponent>
                                  </>
                                )
                              )}
                            </View>
                            {recipeIngredients.notinstore &&
                              recipeIngredients.notinstore.length > 0 && (
                                <View style={{paddingTop: 16}}>
                                  <RowComponent styles={{marginBottom: 8}}>
                                    <TitleComponent
                                      text="Ingredients/items not available through Tinga"
                                      size={20}
                                    />
                                  </RowComponent>

                                  <RowComponent justify="space-between">
                                    {recipeIngredients?.notinstore.map(
                                      (name, index) => (
                                        <View
                                          key={`noinstore${index}`}
                                          style={[
                                            global.shadow,
                                            {
                                              width: (appSize.width - 64) / 2,
                                              height: 170,
                                              marginBottom: 16,
                                            },
                                          ]}>
                                          <FastImage
                                            source={require('../assets/images/no-image.jpg')}
                                            style={{
                                              width: '100%',
                                              flex: 1,

                                              borderTopLeftRadius: 8,
                                              borderTopRightRadius: 8,
                                            }}
                                            resizeMode={
                                              FastImage.resizeMode.cover
                                            }
                                          />
                                          <View
                                            style={{
                                              backgroundColor: appColors.white,
                                              padding: 8,
                                              paddingVertical: 12,
                                              borderBottomLeftRadius: 8,
                                              borderBottomRightRadius: 8,
                                              flex: 0,
                                              justifyContent: 'center',
                                            }}>
                                            <TextComponent
                                              text={name}
                                              styles={{marginVertical: 4}}
                                              size={12}
                                              flex={0}
                                              line={2}
                                              height={16}
                                            />
                                          </View>
                                        </View>
                                      ),
                                    )}
                                  </RowComponent>
                                </View>
                              )}
                          </>
                        )}
                      </View>
                    )}

                    <View style={{paddingTop: 16}}>
                      <RowComponent styles={{marginBottom: 8}}>
                        <TitleComponent text="Prepare Ingredients" size={20} />
                        <TouchableOpacity
                          onPress={() =>
                            setIsPrepareIngredients(!isPrepareIngredients)
                          }>
                          {isPrepareIngredients ? (
                            <ArrowUp2 size={24} color={appColors.text2} />
                          ) : (
                            <ArrowDown2 size={24} color={appColors.text2} />
                          )}
                        </TouchableOpacity>
                      </RowComponent>
                      {isPrepareIngredients && (
                        <View>
                          {recipeDetail.ingredients &&
                            recipeDetail.ingredients.length > 0 &&
                            recipeDetail.ingredients.map((item, index) => (
                              <TextComponent
                                key={`ingredients${index}`}
                                text={`· ${item}`}
                                height={22}
                                font={fontFamilys.medium}
                              />
                            ))}
                        </View>
                      )}
                    </View>
                    <View style={{paddingTop: 16}}>
                      <RowComponent styles={{marginBottom: 8}}>
                        <TitleComponent text="Instructions" size={20} />
                        <TouchableOpacity
                          onPress={() =>
                            setIsShowIntroductions(!isShowIntroductions)
                          }>
                          {isShowIntroductions ? (
                            <ArrowUp2 size={24} color={appColors.text2} />
                          ) : (
                            <ArrowDown2 size={24} color={appColors.text2} />
                          )}
                        </TouchableOpacity>
                      </RowComponent>
                      {isShowIntroductions &&
                        recipeDetail.cooking_instruction &&
                        recipeDetail.cooking_instruction.length > 0 &&
                        recipeDetail.cooking_instruction.map((item, index) => (
                          <RowComponent
                            key={`instruction${index}`}
                            styles={{
                              marginBottom: 8,
                              alignItems: 'flex-start',
                            }}>
                            <TitleComponent
                              flex={0}
                              text={`${index + 1}.`}
                              size={20}
                              color={appColors.success2}
                              styles={{marginTop: -4}}
                            />
                            <View style={{flex: 1, marginLeft: 4}}>
                              <TextComponent
                                text={`${item}`}
                                flex={0}
                                font={fontFamilys.medium}
                              />
                            </View>
                          </RowComponent>
                        ))}
                    </View>
                  </>
                ) : (
                  <>
                    <TextComponent text="Recipe detail not found" />
                  </>
                )}
              </View>
            </ScrollView>
          )}

          <ModalFoodScoreInfo
            visible={isVisibleModalScore}
            onClose={() => setIsVisibleModalScore(false)}
          />
          <LoadingModal visible={isUpdate} />
        </Modalize>
      </Portal>
      <ModalProduct
        visible={isVisibileModalProduct}
        onClose={() => {
          setIsVisibileModalProduct(false);
        }}
        product={ProductDetail}
      />
    </>
  );
};

export default ModalizeRecipeDetail;
