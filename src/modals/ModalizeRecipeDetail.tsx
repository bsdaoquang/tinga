import {useNavigation} from '@react-navigation/native';
import {Add, ArrowDown2, ArrowUp2, Heart, Location} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Tooltip from 'react-native-walkthrough-tooltip';
import {Recipe} from '../Models/Recipe';
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
  const [isVisibleTooltips, setIsVisibleTooltips] = useState(false);
  const navigation: any = useNavigation();

  const prepareIngredient = [
    '1 pound large shrimp, peeled and deveined',
    '1 red onion, cut into chunks',
    '1 zucchini, sliced into rounds',
    '1 yellow bell pepper, cut into chunks',
    '1 pint cherry tomatoes',
    '2 tablespoons olive oil',
    '2 tablespoons fresh lemon juice',
    '2 cloves garlic, minced',
    '1 teaspoon dried oregano',
    '1 teaspoon dried thyme',
    'Salt and pepper to taste',
    'Wooden or metal skewers',
  ];

  const introductions = [
    'In a large bowl, combine the olive oil, lemon juice, minced garlic, dried oregano, dried thyme, salt, and pepper. Mix well to create the marinade.',
    'Add the shrimp to the marinade, tossing to coat them evenly. Allow them to marinate for about 10 minutes while you prepare the vegetables.',
    'Thread the marinated shrimp, onion chunks, zucchini rounds, bell pepper chunks, and cherry tomatoes onto the skewers in an alternating pattern.',
    'Preheat your grill or grill pan over medium-high heat. Brush the surface with a bit of olive oil to prevent sticking.',
    'Grill the skewers for 2-3 minutes on each side until the shrimp turn pink and the vegetables are slightly charred and tender.',
    'Serve the skewers with a side salad or quinoa for a complete Mediterranean feast.',
  ];

  useEffect(() => {
    if (visible) {
      modalRef.current?.open();
    } else {
      modalRef.current?.close();
    }
  }, [visible]);

  useEffect(() => {
    if (item) {
      setTimeout(() => {
        setIsVisibleTooltips(true);
      }, 3000);
    }
  }, []);

  const modalRef = useRef<Modalize>();

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  return (
    <Portal>
      <Modalize
        onClose={onClose}
        ref={modalRef}
        adjustToContentHeight
        handlePosition="inside"
        modalStyle={{
          backgroundColor: appColors.success2,
        }}
        disableScrollIfPossible={false}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        HeaderComponent={
          <RowComponent justify="space-between" styles={{padding: 20}}>
            <TouchableOpacity onPress={() => handleCloseModal()}>
              <AntDesign name="close" color={appColors.white} size={22} />
            </TouchableOpacity>
            <Tooltip
              topAdjustment={-30}
              isVisible={isVisibleTooltips}
              placement="bottom"
              content={
                <TitleComponent
                  flex={0}
                  text={`Favourite this recipe to\ncome back to it later`}
                />
              }
              onClose={() => setIsVisibleTooltips(false)}>
              <TouchableOpacity onPress={() => showToast('Waiting for API')}>
                <Heart color={appColors.white} size={24} />
              </TouchableOpacity>
            </Tooltip>
          </RowComponent>
        }
        FooterComponent={
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
                    <Octicons name="check" size={22} color={appColors.white} />
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
            <RowComponent
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
            </RowComponent>
          </RowComponent>
        }
        handleStyle={{backgroundColor: appColors.gray}}>
        {item && (
          <ScrollView>
            <View
              style={{
                backgroundColor: appColors.success2,
                padding: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <TitleComponent
                text={item.title}
                flex={1}
                size={24}
                color={appColors.white}
                line={2}
              />

              <TextComponent
                styles={{paddingVertical: 8}}
                color={appColors.white}
                text={`${item.times}min · Serves ${item.serves} · ${item.type}`}
                line={22}
                flex={0}
              />
            </View>
            <View
              style={{
                padding: 20,
                backgroundColor: appColors.bgColor,
                flex: 1,
              }}>
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
                      <MaterialIcons name="info" size={20} color={'#9F9F9F'} />
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
                <TextComponent text="Transport your taste buds to the Mediterranean with these delightful grilled shrimp and vegetable skewers. The combination of succulent shrimp, colorful vegetables, and fragrant herbs will have you craving more. This gluten-free, low-carb dinner is a perfect blend of simplicity and freshness." />
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

                    <RowComponent justify="space-between">
                      {products.map((item, index) => (
                        <View
                          key={`product${index}`}
                          style={[
                            global.shadow,
                            {
                              width: (appSize.width - 64) / 2,
                              height: 170,
                              marginBottom: 16,
                            },
                          ]}>
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
                          <View
                            style={{
                              backgroundColor: appColors.white,
                              padding: 8,
                              borderBottomLeftRadius: 8,
                              borderBottomRightRadius: 8,
                            }}>
                            <TextComponent
                              text={`$ ${item.price}`}
                              size={12}
                              height={16}
                            />
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
                            <AntDesign
                              name="checkcircle"
                              size={24}
                              color={appColors.text2}
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </RowComponent>
                  </>
                )}
              </View>
              <View style={{paddingTop: 16}}>
                <RowComponent styles={{marginBottom: 8}}>
                  <TitleComponent
                    text="Ingredients you may already have"
                    size={20}
                  />
                </RowComponent>

                <RowComponent justify="space-between">
                  {products.map(
                    (item, index) =>
                      index < 3 && (
                        <View
                          key={`already${index}`}
                          style={[
                            global.shadow,
                            {
                              width: (appSize.width - 64) / 2,
                              height: 170,
                              marginBottom: 16,
                            },
                          ]}>
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
                          <View
                            style={{
                              backgroundColor: appColors.white,
                              padding: 8,
                              borderBottomLeftRadius: 8,
                              borderBottomRightRadius: 8,
                            }}>
                            <TextComponent
                              text={`$ ${item.price}`}
                              size={12}
                              height={16}
                              flex={0}
                            />
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
                                    backgroundColor: '#FFEDC1',
                                    borderRadius: 100,
                                  },
                                ]}>
                                <TextComponent text="👌" size={10} flex={0} />
                              </View>
                            </RowComponent>
                          </View>

                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              backgroundColor: appColors.primary,
                              borderRadius: 100,
                            }}>
                            <Add color={appColors.white} size={24} />
                          </TouchableOpacity>
                        </View>
                      ),
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
                  <View
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
                      }}
                    />
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
                        text={`Wooden or metal skewers`}
                        styles={{marginVertical: 4}}
                        size={12}
                        flex={0}
                        line={2}
                        height={16}
                      />
                    </View>
                  </View>
                </RowComponent>
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
                    {prepareIngredient.map((item, index) => (
                      <TextComponent
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

                {isShowIntroductions && (
                  <View>
                    {introductions.map((item, index) => (
                      <RowComponent
                        styles={{
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          marginBottom: 8,
                        }}>
                        <TitleComponent flex={0} text={`${index + 1}.`} />
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
                )}
              </View>
            </View>
          </ScrollView>
        )}

        <ModalFoodScoreInfo
          visible={isVisibleModalScore}
          onClose={() => setIsVisibleModalScore(false)}
        />
      </Modalize>
    </Portal>
  );
};

export default ModalizeRecipeDetail;
