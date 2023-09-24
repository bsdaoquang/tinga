import {AddSquare, SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, TextInput, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Product} from '../../../Models/Product';
import handleGetData from '../../../apis/productAPI';
import {SettingIcon} from '../../../assets/svg';
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
import {ModalProduct} from '../../../modals';
import {global} from '../../../styles/global';
import {showToast} from '../../../utils/showToast';
import {fontFamilys} from '../../../constants/fontFamily';

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

  useEffect(() => {
    getProductsList();
  }, [category_id, subCategory_id, subSubCategory_id]);

  useEffect(() => {
    if (searchValue) {
      const items = products.filter(element =>
        element.name.includes(searchValue),
      );

      setResults(items);
    }
  }, [searchValue]);

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
            <SearchNormal1 size={18} color={appColors.gray} />
            <>
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
              {/* {searchValue && (
                <View
                  style={{
                    ...global.shadow,
                    backgroundColor: appColors.white,
                    position: 'absolute',
                    right: 0,
                    top: 48,
                    left: 0,
                    zIndex: 1,
                    padding: 12,
                  }}>
                  {results.length > 0 ? (
                    <FlatList
                      style={{maxHeight: '80%'}}
                      showsVerticalScrollIndicator={false}
                      data={results}
                      renderItem={({item}) => (
                        <RowComponent
                          onPress={() => {
                            setProduct(item);
                            setIsVisibleModalProduct(true);
                          }}
                          justify="flex-start"
                          styles={{paddingVertical: 8}}>
                          <ImageProduct imageUrl={item.image} />
                          <View style={{paddingHorizontal: 8, flex: 1}}>
                            <TextComponent text={item.name} flex={0} line={2} />
                          </View>
                        </RowComponent>
                      )}
                    />
                  ) : (
                    <TextComponent text="fafas" flex={0} />
                  )}
                </View>
              )} */}
            </>

            {searchValue.length > 0 && (
              <Button
                styles={{marginRight: 8}}
                icon={
                  <AntDesign name="close" size={18} color={appColors.text2} />
                }
                onPress={() => setSearchValue('')}
              />
            )}

            <TouchableOpacity onPress={() => setIsVisibleModalFilter(true)}>
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
      {searchValue && (
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
              // height: '100%',
              borderBottomRightRadius: 8,
              borderBottomLeftRadius: 8,
            }}>
            {results.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={results}
                renderItem={({item}) => (
                  <RowComponent
                    onPress={() => {
                      setProduct(item);
                      setIsVisibleModalProduct(true);
                    }}
                    justify="flex-start"
                    styles={{paddingVertical: 8}}>
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
                  text="Can’t find what you’re looking for?Help us grow our database."
                  flex={0}
                />
                <SpaceComponent height={12} />
                <RowComponent onPress={() => showToast('Comming soon')}>
                  <AddSquare variant="Bold" color={appColors.text} size={20} />

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
      )}

      <ModalProduct
        product={product}
        products={products}
        visible={isVisibleModalProduct}
        onClose={() => {
          setIsVisibleModalProduct(false);
          setProduct(undefined);
        }}
      />
    </>
  );
};

export default SearchFilterComponent;
