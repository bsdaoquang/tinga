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
import {SettingIcon} from '../../assets/svg';
import {
  Button,
  ButtonComponent,
  CardContent,
  Container,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {global} from '../../styles/global';
import ProductItem from './components/ProductItem';
import {appSize} from '../../constants/appSize';
import {fontFamilys} from '../../constants/fontFamily';

const ExploreScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<any[]>([]);

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
              <TitleComponent text="Top categories" size={24} flex={0} />
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
                data={Array.from({length: 20})}
                renderItem={({item, index}) => (
                  <ProductItem item={{id: index}} />
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
