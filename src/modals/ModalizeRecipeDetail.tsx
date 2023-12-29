import {useNavigation} from '@react-navigation/native';
import {Add, ArrowDown2, ArrowUp2, Heart, Location} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Tooltip from 'react-native-walkthrough-tooltip';
import {
  ProductStore,
  Recipe,
  RecipeDetail,
  RecipeIngredient,
} from '../Models/Recipe';
import {
  Button,
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {appSize} from '../constants/appSize';
import {fontFamilys} from '../constants/fontFamily';
import {products} from '../demoData/products';
import {global} from '../styles/global';
import {showToast} from '../utils/showToast';
import ModalFoodScoreInfo from './ModalFoodScoreInfo';
import handleMealApi from '../apis/mealplannerAPI';
import {Product} from '../Models/Product';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoadingModal from './LoadingModal';

interface Props {
  visible: boolean;
  onClose: () => void;
  item?: Recipe;
}

const ModalizeRecipeDetail = (props: Props) => {
  const {visible, onClose, item} = props;

  const [isVisibleIngredients, setIsVisibleIngredients] = useState(false);
  const [isPrepareIngredients, setIsPrepareIngredients] = useState(false);
  const [isShowIntroductions, setIsShowIntroductions] = useState(false);
  const [isVisibleModalScore, setIsVisibleModalScore] = useState(false);
  const [shopCount, setShopCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeDetail, setRecipeDetail] = useState<RecipeDetail>();
  const [recipeIngredients, setRecipeIngredients] =
    useState<RecipeIngredient>();
  const [isUpdate, setIsUpdate] = useState(false);

  const navigation: any = useNavigation();
  const modalRef = useRef<Modalize>();

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

    try {
      const res: any = await handleMealApi.handleMealPlanner(api);

      if (res) {
        setRecipeIngredients(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  const handleAddToFavourit = async () => {
    if (item) {
      const api =
        recipeDetail && recipeDetail.is_favourite === '1'
          ? 'removeRecipeFavourite'
          : `addRecipeFavourite`;

      setIsUpdate(true);
      try {
        const res: any = await handleMealApi.handleMealPlanner(
          api,
          {recipe_id: item?.id},
          'post',
        );

        showToast(res.message);
        setIsUpdate(false);
        getRecipeDetailById();
      } catch (error) {
        console.log(error);
        setIsUpdate(false);
      }
    }
  };

  const renderProductItem = (instore: boolean, item: ProductStore) => (
    <View
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
              text={item.shopname ?? ''}
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
                backgroundColor: '#E6EECC',
                borderRadius: 100,
              },
            ]}>
            <TextComponent text="👍" size={10} flex={0} />
          </View>
        </RowComponent>
      </View>

      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 10,
          top: 10,
        }}>
        <AntDesign name="checkcircle" size={24} color={appColors.text2} />
      </TouchableOpacity>
    </View>
  );

  console.log(recipeDetail);

  return (
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

            <TouchableOpacity onPress={() => handleAddToFavourit()}>
              <Heart
                variant={
                  recipeDetail?.is_favourite === '1' ? 'Bold' : 'Outline'
                }
                color={appColors.white}
                size={24}
              />
            </TouchableOpacity>
          </RowComponent>
        }
        FooterComponent={
          !isLoading ? (
            <RowComponent
              styles={{
                padding: 12,
                paddingHorizontal: 16,
                backgroundColor: appColors.white,
                paddingBottom: 20,
              }}>
              <View style={{flex: 1}}>
                <ButtonComponent
                  disable={shopCount === 9}
                  color={shopCount === 9 ? appColors.gray : appColors.success1}
                  styles={{
                    paddingVertical: 15,
                  }}
                  icon={
                    shopCount === 9 && (
                      <Octicons
                        name="check"
                        size={22}
                        color={appColors.white}
                      />
                    )
                  }
                  textColor={shopCount === 9 ? appColors.white : appColors.text}
                  text={
                    shopCount === 9
                      ? 'Added 9 Ingredients to List'
                      : 'Add 9 Ingredients to List'
                  }
                  onPress={() => setShopCount(9)}
                />
              </View>
              {/* <RowComponent
                onPress={() => {
                  modalRef.current?.close();
                  navigation.navigate('Grocery List', {
                    screen: 'GroceryScreen',
                  });
                  setShopCount(0);
                }}
                styles={{
                  marginLeft: 12,
                  backgroundColor: appColors.primary,
                  borderRadius: 12,
                  padding: 15,
                }}>
                <FontAwesome5 name="shopping-cart" color={appColors.white} />
                <SpaceComponent width={6} />
                <TitleComponent
                  text={shopCount.toString()}
                  flex={0}
                  color={appColors.white}
                  font={fontFamilys.medium}
                />
              </RowComponent> */}
            </RowComponent>
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
                <RowComponent>
                  <ActivityIndicator />
                </RowComponent>
              ) : recipeDetail ? (
                <>
                  <RowComponent justify="flex-start">
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
                          right: 0,
                        }}
                        onPress={() => setIsVisibleModalScore(true)}
                        icon={
                          <MaterialIcons
                            name="info"
                            size={20}
                            color={'#9F9F9F'}
                          />
                        }
                      />
                    </View>

                    <ButtonComponent
                      styles={[
                        global.shadow,
                        {
                          borderRadius: 100,
                          height: 40,
                          paddingVertical: 0,
                        },
                      ]}
                      fontStyles={{
                        color: appColors.primary,
                        fontFamily: fontFamilys.regular,
                        fontSize: 14,
                        lineHeight: 14,
                      }}
                      color={appColors.white}
                      text="Gluten Free"
                      onPress={() => {}}
                    />
                  </RowComponent>
                  <View style={{paddingTop: 16}}>
                    <TextComponent
                      styles={{textAlign: 'justify'}}
                      text={recipeDetail?.description}
                    />
                  </View>
                  <View style={{paddingTop: 16}}>
                    <RowComponent styles={{marginBottom: 8}}>
                      <TitleComponent text="Ingredients" size={20} />
                      <TouchableOpacity
                        onPress={() =>
                          setIsVisibleIngredients(!isVisibleIngredients)
                        }>
                        {isVisibleIngredients ? (
                          <ArrowUp2 size={24} color={appColors.text2} />
                        ) : (
                          <ArrowDown2 size={24} color={appColors.text2} />
                        )}
                      </TouchableOpacity>
                    </RowComponent>
                    {isVisibleIngredients && (
                      <>
                        <TextComponent
                          text="Note: Check ingredient quantities before adding to your list."
                          size={12}
                        />

                        {recipeIngredients?.ingrocerylist && (
                          <RowComponent justify="space-between">
                            {recipeIngredients.ingrocerylist.map(
                              (item, index) => renderProductItem(true, item),
                            )}
                          </RowComponent>
                        )}

                        <View style={{paddingTop: 16}}>
                          <RowComponent styles={{marginBottom: 8}}>
                            <TitleComponent
                              text="Ingredients you may already have"
                              size={20}
                            />
                          </RowComponent>

                          <RowComponent justify="space-between">
                            {recipeIngredients?.instore.map((item, index) =>
                              renderProductItem(false, item),
                            )}
                          </RowComponent>
                        </View>
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
                                  <View
                                    style={{
                                      flex: 1.5,
                                      backgroundColor: appColors.gray,
                                      borderTopLeftRadius: 8,
                                      borderTopRightRadius: 8,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <Ionicons
                                      name="image-outline"
                                      size={28}
                                      color={'#b1b1b1'}
                                    />
                                  </View>
                                  <View
                                    style={{
                                      backgroundColor: appColors.white,
                                      padding: 8,
                                      borderBottomLeftRadius: 8,
                                      borderBottomRightRadius: 8,
                                      flex: 1,
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
                      </>
                    )}
                  </View>

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
                        {recipeDetail.ingredients.map((item, index) => (
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
                      recipeDetail.cooking_instruction.map((item, index) => (
                        <RowComponent
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
  );
};

export default ModalizeRecipeDetail;
