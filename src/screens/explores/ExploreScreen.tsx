import {AddSquare, SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Category} from '../../Models/Category';
import {SettingIcon} from '../../assets/svg';
import {
  Button,
  ButtonComponent,
  CardContent,
  CategoryItem,
  Container,
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

const imageCat =
  'https://s3-alpha-sig.figma.com/img/40d7/0023/5868cd6302567bf42e76f428442f47b7?Expires=1693785600&Signature=g7smBLUhN77wSMh~jRHZob99Le6q376mZzJ6BVhLHYBXj4IiV0I~aVYHlCtFXottxPmlldG1dAp1OGoiqmqujvOBLcFlT-IxkfVEOZviAcY87SF-3CTu6OOmuK3etGLt0bHfxutE5C5GRJ1Fz-3axOoDkkhpC0n2GZHH~QgQMTHXCX2ZCeZ3mr~~rXbMFEctVnmQnl2xySJ7XUpn3TWCMjBe3rAMpNySMSoM8O4kCfjK9nC7VhTOGBBjU~XDWBgnbK17kT43Ipj6i8tproTiugN66nHkGH5hfg2-za5krDdt2sbCrLdg~cp6fpk1ODmHuJwriVxrZ7iyLQobA9EU2Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

const ExploreScreen = ({navigation}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [categoriesTitle, setCategoriesTitle] = useState('Top categories');
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      title: 'Produce',
      imageUrl: imageCat,
      childrens: [
        {
          id: 'child1',
          title: 'Fruit',
          imageUrl: imageCat,
        },
        {
          id: 'child2',
          title: 'Berries',
          imageUrl: imageCat,
        },
        {
          id: 'child3',
          title: 'Stonefruit',
          imageUrl: imageCat,
        },
        {
          id: 'child1',
          title: 'Vegetables',
          imageUrl: imageCat,
        },
      ],
    },
    {
      id: '2',
      title: 'Meat, seafood & alternatives',
      imageUrl: imageCat,
    },
    {
      id: '3',
      title: 'Nuts & seeds',
      imageUrl: imageCat,
    },
    {
      id: '4',
      title: 'Pasta & grains',
      imageUrl: imageCat,
    },
    {
      id: '5',
      title: 'Dairy & alternatives',
      imageUrl: imageCat,
    },
    {
      id: '6',
      title: 'Spices & seasonings',
      imageUrl: imageCat,
    },
    {
      id: '7',
      title: 'Oils, vinegars & Ghee',
      imageUrl: imageCat,
    },
    {
      id: '8',
      title: 'Nut butters & fruit spreads',
      imageUrl: imageCat,
    },
    {
      id: '9',
      title: 'Bread & bakery products',
      imageUrl: imageCat,
    },
    {
      id: '10',
      title: 'Baking supplies',
      imageUrl: imageCat,
    },
    {
      id: '11',
      title: 'Cereals & Granola',
      imageUrl: imageCat,
    },
    {
      id: '12',
      title: 'Soups & side dishes',
      imageUrl: imageCat,
    },
    {
      id: '13',
      title: 'Beverages',
      imageUrl: imageCat,
    },
    {
      id: '14',
      title: 'Snacks',
      imageUrl: imageCat,
    },
    {
      id: '15',
      title: 'Honey & sweeteners',
      imageUrl: imageCat,
    },
    {
      id: '16',
      title: 'Condiments &  dressings',
      imageUrl: imageCat,
    },
    {
      id: '17',
      title: 'Frozen & ready to eat meals',
      imageUrl: imageCat,
    },
  ]);

  useEffect(() => {
    if (searchValue) {
      const items = itemsSearch.filter(element =>
        element.title.toLowerCase().includes(searchValue.toLowerCase()),
      );

      if (items.length > 0) {
        setResults(items);
      }
    } else {
      setResults([]);
    }
  }, [searchValue]);

  const itemsSearch = [
    {
      id: 1,
      title: 'Apple “Royal Gala”',
      imageUrl:
        'https://s3-alpha-sig.figma.com/img/620f/e1b9/e9b5cef2015ab78d3d15ac9542b76f0a?Expires=1694390400&Signature=hFKUQwT8Q3dMyNNfIkr6Xc4LpHTLrVO0Outk7i0T5eoJwSKJjo7foynJG37E0q1DTUzx~5M8HmaU6mwiOIzQQ4DBQJBF2w70jUvJrqNbf6i24sXkeX-eZEqeN514CCW-~pPLpaBeYCzsEK5CIzUC-37K6hxJKTIkdHPH2EjJ~LF5vzcKEEd6gTNI2pUlMOBkpr-Kl82qdLSU7PabJ79LleiN2NzExwuvClG2e~FPEfhXh0Wt9q913NkRbG4SFDWX7UkowDrdt2h5ZddoKmQb418kxa8mBL9Fi8uRkQ9IFZeT-g1mB29be7OBUS2sCfjmoisgR9lj6mwjXx2YXvDbWw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    },
    {
      id: 2,
      title: 'Apple Pie “Golden”',
      imageUrl:
        'https://s3-alpha-sig.figma.com/img/fe50/c429/b7fe121db29ef4675012c561af1555b5?Expires=1694390400&Signature=hMaE7wqBOah66X6clfjgbv5E1GsgXwyiCXGL05-bqG2~pQaroUMZmiROA536uucDw9zp8fXzui3wTxOZNU0c5vuhXnywePn9PN~Y6WZayNwpYfpsXKvPfqPIbgHAn03XEx8yHvah3f6vjbW5dLZrKzdu47oeK0vao87bBzyoKBRDMFSXNqobMpgTxZuosB0rGfQdPgigTQMH2n4Uo~BG7P0MYgWzT60INpTa0nYZuFusJWy8qupzUa4LizqQ2dm~amPrHZjuaFIzj8wM0USnNTkujgsui8ohz89QhPrH22Exxw8EEQhQa~8cXTOA1HEnkdIvFExE7AmwBzURPugpRQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    },
  ];

  const handleCategory = (item: Category) => {
    if (item.childrens) {
      setCategoriesTitle(item.title);
      setCategories(item.childrens);
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
                  <CardContent
                    isShadow
                    onPress={() => console.log('first')}
                    color={appColors.white}
                    styles={{
                      padding: 0,
                      width: (appSize.width - 48) / 2,
                      marginLeft: 16,

                      marginBottom: 16,
                    }}>
                    <Image
                      style={{
                        width: '100%',
                        height: 100,
                        resizeMode: 'cover',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      }}
                      source={{
                        uri: 'https://s3-alpha-sig.figma.com/img/fe50/c429/b7fe121db29ef4675012c561af1555b5?Expires=1694390400&Signature=hMaE7wqBOah66X6clfjgbv5E1GsgXwyiCXGL05-bqG2~pQaroUMZmiROA536uucDw9zp8fXzui3wTxOZNU0c5vuhXnywePn9PN~Y6WZayNwpYfpsXKvPfqPIbgHAn03XEx8yHvah3f6vjbW5dLZrKzdu47oeK0vao87bBzyoKBRDMFSXNqobMpgTxZuosB0rGfQdPgigTQMH2n4Uo~BG7P0MYgWzT60INpTa0nYZuFusJWy8qupzUa4LizqQ2dm~amPrHZjuaFIzj8wM0USnNTkujgsui8ohz89QhPrH22Exxw8EEQhQa~8cXTOA1HEnkdIvFExE7AmwBzURPugpRQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
                      }}
                    />
                    <View style={{padding: 10}}>
                      <TextComponent text="$12.99" />
                      <TextComponent
                        text="Apple Pie “Golden"
                        size={12}
                        styles={{marginVertical: 4}}
                      />
                    </View>
                  </CardContent>
                  // <ProductItem item={{id: index}} />
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
        ) : (
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
                    onPress={() =>
                      item.childrens
                        ? handleCategory(item)
                        : navigation.navigate('CategoryDetail', {
                            category: item,
                          })
                    }
                    key={`category${item.id}`}
                  />
                )}
              />
            </View>
          </>
        )}
      </Container>
      {isFocused && (
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => setIsFocused(false)}>
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
                  <View
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
                    {results.length > 0 ? (
                      <>
                        {results.map(item => (
                          <RowComponent
                            key={item.id}
                            styles={{paddingVertical: 8}}>
                            <Image
                              source={{uri: item.imageUrl}}
                              style={{
                                width: 42,
                                height: 40,
                                borderRadius: 100,
                                resizeMode: 'cover',
                                marginRight: 8,
                              }}
                            />
                            <TextComponent text={item.title} />
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
                  </View>
                )}
              </RowComponent>
            </SectionComponent>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

export default ExploreScreen;
