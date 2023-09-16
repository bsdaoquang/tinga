import {useIsFocused} from '@react-navigation/native';
import {AddSquare, SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  Image,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Category} from '../../Models/Category';
import handleGetData from '../../apis/productAPI';
import {SettingIcon} from '../../assets/svg';
import {
  Button,
  ButtonComponent,
  CategoryItem,
  Container,
  LoadingComponent,
  ProductItemComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {appSize} from '../../constants/appSize';
import {fontFamilys} from '../../constants/fontFamily';
import {global} from '../../styles/global';
import {showToast} from '../../utils/showToast';
import LinearGradient from 'react-native-linear-gradient';
import {Product} from '../../Models/Product';

const titleCat = 'Top categories';

const ExploreScreen = ({navigation}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [categoriesTitle, setCategoriesTitle] = useState(titleCat);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [catIds, setCatIds] = useState<number[]>([0]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const focus = useIsFocused();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setCategoriesTitle(titleCat);
    getCategories();
    setCatIds([]);
  }, [navigation, focus]);

  useEffect(() => {
    const id = catIds[catIds.length - 1];

    id && getCategoriesById(id);
  }, [catIds]);

  useEffect(() => {
    setIsSearching(true);
    if (searchValue) {
      const items = products.filter(element =>
        element.name.toLowerCase().includes(searchValue.toLowerCase()),
      );

      if (items.length > 0) {
        setResults(items);
      } else {
        setResults([]);
      }
      setIsSearching(false);
    } else {
      setResults([]);
    }
  }, [searchValue]);

  const appleImageURL = `https://firebasestorage.googleapis.com/v0/b/tinga-f7936.appspot.com/o/e9b5cef2015ab78d3d15ac9542b76f0a.png?alt=media&token=ab19646b-a9e3-4691-874e-6fa2a0f9d7bd`;
  const foodImageURL = `https://firebasestorage.googleapis.com/v0/b/tinga-f7936.appspot.com/o/b7fe121db29ef4675012c561af1555b5.png?alt=media&token=8892f65f-dfce-4b78-a7da-4cc9423d5838`;

  const getProducts = async () => {
    const api = `/getProductListing`;

    try {
      await handleGetData
        .handleProduct(
          api,
          {
            category_id: '0',
            subcategory_id: '0',
            sub_subcategory_id: '0',
            offset: '',
          },
          'post',
        )
        .then((res: any) => {
          setProducts(res);
        });
    } catch (error) {
      console.log(error);
      showToast('Can not get products');
    }
  };

  const getCategories = async () => {
    const api = `/getCategories`;

    try {
      setIsLoading(true);

      await handleGetData.handleProduct(api).then((res: any) => {
        setCategories(res);
        setIsLoading(false);
      });
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      showToast(error.message);
    }
  };

  const getCategoriesById = async (id: number) => {
    const api = `/getSubCategories/${id}`;

    try {
      await handleGetData.handleProduct(api).then((res: any) => {
        setIsLoading(false);
        setCategories(res);
      });
    } catch (error: any) {
      setIsLoading(false);
      console.log(`Can not get sub categories ${error.message}`);
      console.log(error);
    }
  };

  return (
    <>
      <Container
        right={
          <Button
            icon={
              <AddSquare size={24} color={appColors.text3} variant="Bold" />
            }
            onPress={() => {}}
          />
        }>
        <SectionComponent styles={{zIndex: 5}}>
          <RowComponent>
            <RowComponent
              onPress={() => setIsFocused(true)}
              styles={{
                ...global.shadow,
                backgroundColor: appColors.white,
                borderRadius: 8,
                paddingHorizontal: 8,
                flex: 1,
                paddingVertical: 12,
              }}>
              <SearchNormal1 size={18} color={appColors.gray} />
              <TextComponent
                text={searchValue ? searchValue : 'Search groceries'}
                color={searchValue ? appColors.text3 : appColors.gray}
                flex={1}
                styles={{paddingHorizontal: 8}}
              />
              <TouchableOpacity>
                <SettingIcon width={24} color={appColors.text} />
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 6,
                    height: 6,
                    borderRadius: 4,
                    backgroundColor: appColors.error,
                  }}
                />
              </TouchableOpacity>
            </RowComponent>

            <SpaceComponent width={12} />
            <ButtonComponent
              color={appColors.primary}
              onPress={() => {}}
              icon={
                <FontAwesome6
                  name="cart-shopping"
                  size={14}
                  color={appColors.white}
                />
              }
              text="0"
              textColor={appColors.white}
              styles={{
                width: 48,
                height: 48,
              }}
            />
          </RowComponent>
        </SectionComponent>

        {searchValue ? (
          <>
            <SectionComponent>
              <TitleComponent
                text={
                  results.length > 0
                    ? `Gluten-free results for “${searchValue}”`
                    : `No gluten-free results for “${searchValue}”`
                }
                size={20}
                flex={0}
              />
            </SectionComponent>
            {results.length > 0 ? (
              <FlatList
                numColumns={2}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                data={Array.from({length: 20})}
                renderItem={({item, index}) => (
                  <ProductItemComponent
                    item={{
                      imageUrl: index % 2 === 0 ? appleImageURL : foodImageURL,
                    }}
                    styles={{marginLeft: 16}}
                  />
                )}
              />
            ) : (
              <SectionComponent
                styles={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextComponent
                  text="Can’t find what you’re looking for?"
                  flex={0}
                />
                <SpaceComponent height={12} />
                <TextComponent
                  text="Edit your filters "
                  font={fontFamilys.bold}
                  styles={{textDecorationLine: 'underline'}}
                  flex={0}
                />
                <TextComponent text="or help us grow our database." flex={0} />

                <SpaceComponent height={12} />
                <RowComponent>
                  <Button
                    icon={
                      <AddSquare
                        size={24}
                        color={appColors.text3}
                        variant="Bold"
                      />
                    }
                    onPress={() => {}}
                  />
                  <SpaceComponent width={8} />
                  <TextComponent
                    font={fontFamilys.bold}
                    text="Add Missing Product"
                    color={appColors.text3}
                    size={14}
                    flex={0}
                  />
                </RowComponent>
              </SectionComponent>
            )}
          </>
        ) : !isLoading ? (
          <>
            <SectionComponent>
              <TitleComponent text={categoriesTitle} size={24} flex={0} />
            </SectionComponent>
            <View
              style={{
                flex: 1,
              }}>
              <FlatList
                numColumns={3}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                style={{paddingHorizontal: 16}}
                data={categories}
                renderItem={({item, index}) => (
                  <CategoryItem
                    item={item}
                    onPress={() => {
                      setCategoriesTitle(item.name);
                      setCatIds([...catIds, item.id]);
                    }}
                    key={`category${item.id}`}
                  />
                )}
              />
            </View>
          </>
        ) : (
          <LoadingComponent isLoading={isLoading} value={categories.length} />
        )}
      </Container>
      {isFocused && (
        <View style={{flex: 1}}>
          <View
            style={{
              ...global.container,
              backgroundColor: 'rgba(0,0,0, 0.4)',
              flex: 1,
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              paddingTop: (Platform.OS === 'android' ? 32 : 48) + 48,
            }}>
            <SectionComponent>
              <RowComponent
                styles={{
                  ...global.shadow,
                  backgroundColor: appColors.white,
                  height: 48,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 8,
                  marginRight: 60,
                  borderRadius: 8,
                  zIndex: 2,
                }}>
                <SearchNormal1 size={18} color={appColors.gray} />
                <TextInput
                  autoFocus
                  onEndEditing={() => setIsFocused(false)}
                  autoCapitalize="none"
                  autoComplete="off"
                  value={searchValue}
                  onChangeText={val => setSearchValue(val)}
                  style={{
                    margin: 0,
                    paddingHorizontal: 8,
                    flex: 1,
                  }}
                  placeholder="Search groceries"
                />
                <TouchableOpacity>
                  <SettingIcon width={24} color={appColors.text} />
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 6,
                      height: 6,
                      borderRadius: 4,
                      backgroundColor: appColors.error,
                    }}
                  />
                </TouchableOpacity>
                {searchValue && (
                  <ScrollView
                    keyboardShouldPersistTaps="always"
                    style={{
                      ...global.shadow,
                      backgroundColor: appColors.bgColor,
                      position: 'absolute',
                      top: 42,
                      right: 0,
                      padding: 20,
                      maxHeight: appSize.height * 0.4,
                      overflow: 'scroll',
                      zIndex: 1,
                      left: 0,
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                    }}>
                    {isSearching ? (
                      <ActivityIndicator />
                    ) : results.length > 0 ? (
                      <>
                        {results.map(item => (
                          <RowComponent
                            key={item.id}
                            styles={{paddingVertical: 8}}>
                            <Image
                              source={{uri: item.image}}
                              style={{
                                width: 42,
                                height: 40,
                                borderRadius: 100,
                                resizeMode: 'cover',
                                marginRight: 8,
                              }}
                            />
                            <TextComponent text={item.name} />
                          </RowComponent>
                        ))}
                      </>
                    ) : (
                      <>
                        <TextComponent
                          text="Can’t find what you’re looking for? Help us grow our database."
                          color={appColors.text3}
                          size={14}
                        />
                        <SpaceComponent height={12} />
                        <RowComponent>
                          <Button
                            icon={
                              <AddSquare
                                size={24}
                                color={appColors.text3}
                                variant="Bold"
                              />
                            }
                            onPress={() => {}}
                          />
                          <SpaceComponent width={8} />
                          <TextComponent
                            font={fontFamilys.bold}
                            text="Add Missing Product"
                            color={appColors.text3}
                            size={14}
                          />
                        </RowComponent>
                      </>
                    )}
                  </ScrollView>
                )}
              </RowComponent>
            </SectionComponent>
          </View>
        </View>
      )}
    </>
  );
};

export default ExploreScreen;
