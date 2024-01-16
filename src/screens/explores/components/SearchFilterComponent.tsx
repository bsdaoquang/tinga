import {useIsFocused, useNavigation} from '@react-navigation/native';
import {AddSquare, SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {Product} from '../../../Models/Product';
import handleGetData from '../../../apis/productAPI';
import {
  Button,
  ButtonComponent,
  ImageProduct,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilys} from '../../../constants/fontFamily';
import {ModalProduct} from '../../../modals';
import ModalizeFilter from '../../../modals/ModalizeFilter';
import {groceriesSelector} from '../../../redux/reducers/groceryReducer';
import {global} from '../../../styles/global';
import {showToast} from '../../../utils/showToast';

interface Props {
  category_id: number;
  subCategory_id?: number;
  subSubCategory_id?: number;
}

const SearchFilterComponent = (props: Props) => {
  const {category_id, subCategory_id, subSubCategory_id} = props;

  const [searchValue, setSearchValue] = useState('');
  const [isVisibleModalFilter, setIsVisibleModalFilter] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>();
  const [isVisibleModalProduct, setIsVisibleModalProduct] = useState(false);
  const [isSearch, setIsSearch] = useState(true);

  const navigation: any = useNavigation();
  const isFocused = useIsFocused();

  const grocecyList = useSelector(groceriesSelector);

  useEffect(() => {
    if (isFocused) {
      setSearchValue('');
    }
  }, [isFocused]);

  useEffect(() => {
    getProductsList();
  }, [category_id, subCategory_id, subSubCategory_id]);

  useEffect(() => {
    if (searchValue && searchValue.length >= 3) {
      setResults([]);
      searchProduct();
    } else {
      setResults([]);
    }
  }, [searchValue]);

  const searchProduct = async () => {
    const api = `/searchGroceriesList`;
    const data = {
      search: searchValue,
      page: 1,
    };

    setIsSearch(true);

    try {
      const res: any = await handleGetData.handleProduct(api, data, 'post');

      setIsSearch(false);
      setResults(res);
    } catch (error) {
      console.log(error);
      setIsSearch(false);
    }
  };

  const getProductsList = async () => {
    const api = `/getProductListing`;
    const data = {
      category_id: 0,
    };

    try {
      await handleGetData.handleProduct(api, data, 'post').then((res: any) => {
        setProducts(res);
      });
    } catch (error) {
      console.log('Can not get product');
    }
  };

  return (
    <>
      <SectionComponent styles={{paddingBottom: 12, zIndex: 1}}>
        <RowComponent>
          <RowComponent
            styles={{
              ...global.shadow,
              backgroundColor: appColors.white,
              borderRadius: 8,
              paddingHorizontal: 8,
              flex: 1,
              paddingVertical: 12,
              zIndex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SearchGrocery', {
                  searchKey: searchValue,
                  results,
                });
              }}>
              <SearchNormal1 size={18} color={appColors.gray4} />
            </TouchableOpacity>

            <TextInput
              value={searchValue}
              onChangeText={val => setSearchValue(val)}
              style={{
                ...global.text,
                flex: 1,
                margin: 0,
                padding: 0,
                paddingHorizontal: 8,
              }}
              autoCapitalize="none"
              placeholder="Search groceries"
              placeholderTextColor={appColors.gray}
            />

            {searchValue.length > 0 && (
              <Button
                styles={{marginRight: 8}}
                icon={
                  <AntDesign name="close" size={18} color={appColors.text2} />
                }
                onPress={() => setSearchValue('')}
              />
            )}

            <TouchableOpacity onPress={() => navigation.navigate('HomeScan')}>
              <MaterialCommunityIcons
                name="barcode-scan"
                size={24}
                color={appColors.gray4}
              />
            </TouchableOpacity>
          </RowComponent>

          <SpaceComponent width={12} />
          <ButtonComponent
            color={appColors.primary}
            onPress={() =>
              navigation.navigate('Grocery List', {screen: 'GroceryScreen'})
            }
            icon={
              <FontAwesome6
                name="cart-shopping"
                size={12}
                color={appColors.white}
              />
            }
            text={grocecyList.length}
            // text="5"
            textColor={appColors.white}
            styles={{
              width: 50,
              height: 50,
              padding: 0,
              margin: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            fontStyles={{fontSize: 18}}
          />
        </RowComponent>
      </SectionComponent>
      {searchValue && searchValue.length >= 3 ? (
        isSearch ? (
          <ActivityIndicator />
        ) : (
          <>
            <View
              style={{
                paddingHorizontal: 16,
                position: 'absolute',
                marginRight: 60,
                top: 48,
                right: 0,
                left: 0,
                zIndex: 1,
                flex: 1,
                height: '100%',
              }}>
              <View
                style={{
                  ...global.shadow,
                  backgroundColor: appColors.white,
                  padding: 12,
                  maxHeight: '90%',
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8,
                }}>
                {results.length > 0 ? (
                  <FlatList
                    ListHeaderComponent={
                      <RowComponent
                        justify="flex-end"
                        onPress={() =>
                          navigation.navigate('SearchGrocery', {
                            searchKey: searchValue,
                            results,
                          })
                        }>
                        <TextComponent
                          text="See all"
                          size={12}
                          color={appColors.primary}
                          flex={0}
                        />
                      </RowComponent>
                    }
                    showsVerticalScrollIndicator={false}
                    data={results}
                    keyExtractor={(_item, index) => `item${index}`}
                    renderItem={({item, index}) => (
                      <RowComponent
                        onPress={() => {
                          setProduct(item);
                          setIsVisibleModalProduct(true);
                        }}
                        justify="flex-start"
                        styles={{paddingVertical: 8}}
                        key={`result${index}`}>
                        <ImageProduct imageUrl={item.image} />
                        <View style={{paddingHorizontal: 8, flex: 1}}>
                          <TextComponent text={item.name} flex={0} line={2} />
                        </View>
                      </RowComponent>
                    )}
                  />
                ) : (
                  <>
                    <TextComponent
                      text="Can’t find what you’re looking for? Help us grow our database."
                      flex={0}
                    />
                    <SpaceComponent height={12} />
                    <RowComponent onPress={() => showToast('Comming soon')}>
                      <AddSquare
                        variant="Bold"
                        color={appColors.text}
                        size={20}
                      />

                      <SpaceComponent width={8} />
                      <TextComponent
                        text="Add Missing Product"
                        font={fontFamilys.bold}
                      />
                    </RowComponent>
                  </>
                )}
              </View>
            </View>
          </>
        )
      ) : null}

      <ModalProduct
        product={product}
        products={[]}
        visible={isVisibleModalProduct}
        onClose={() => {
          setIsVisibleModalProduct(false);
          setProduct(undefined);
        }}
        // onAddToList={async (count: number, shop_id: number) =>
        //   product
        //     ? await HandleProduct.addToList(product, count, shop_id)
        //     : undefined
        // }
      />

      <ModalizeFilter
        visible={isVisibleModalFilter}
        onClose={() => setIsVisibleModalFilter(false)}
      />
    </>
  );
};

export default SearchFilterComponent;
