import {AddSquare, SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Button,
  ButtonComponent,
  Container,
  ProductItemComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {global} from '../../styles/global';
import {Product} from '../../Models/Product';
import handleGetData from '../../apis/productAPI';

const SearchGrocery = ({navigation, route}: any) => {
  const {searchKey, results}: {searchKey: string; results: Product[]} =
    route.params;
  const [searchValue, setSearchValue] = useState(searchKey ?? '');
  const [cardCount, setCardCount] = useState(0);
  const [resultsValue, setResultsValue] = useState<Product[]>(results ?? '');
  const [isSearch, setIsSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadmore, setIsLoadmore] = useState(false);

  useEffect(() => {
    getCardCount();
  }, []);

  useEffect(() => {
    if (!searchValue) {
      setResultsValue([]);
    } else {
      searchProduct();
    }
  }, [searchValue, page]);

  const searchProduct = async () => {
    const api = `/searchGroceriesList`;
    const data = {
      search: searchValue,
      page,
    };

    setIsSearch(true);
    // page === 1 ? setIsSearch(true) : setIsLoadmore(true);

    try {
      const res: any = await handleGetData.handleProduct(api, data, 'post');

      setIsSearch(false);

      if (page > 1) {
        // console.log(res, page);
        res.length > 0 && setResultsValue([...resultsValue, ...res]);

        setIsLoadmore(false);
      } else {
        setResultsValue(res);
      }
    } catch (error) {
      console.log(`Error search product ${error}`);
      setIsSearch(false);
    }
  };

  const getCardCount = async () => {
    // const api = `/getProductGroceryCount`;
    // try {
    //   const res: any = await handleGetData.handleProduct(api);
    //   res && setCardCount(res);
    //   console.log(res);
    // } catch (error) {
    //   console.log(`get card count ${error}`);
    // }
  };

  return (
    <Container
      back
      right={
        <Button
          icon={<AddSquare size={24} color={appColors.text3} variant="Bold" />}
          onPress={() =>
            navigation.navigate('Home', {
              screen: 'MyAddedProducts',
            })
          }
        />
      }>
      <SectionComponent>
        <RowComponent styles={{marginBottom: 30}}>
          <RowComponent
            styles={[
              global.shadow,
              {
                backgroundColor: appColors.white,
                borderRadius: 8,
                paddingHorizontal: 8,
                flex: 1,
                paddingVertical: 12,
                zIndex: 1,
              },
            ]}>
            <SearchNormal1 size={18} color={appColors.gray4} />

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

            <TouchableOpacity
              onPress={() => navigation.navigate('HomeScan')}
              // onPress={() => setIsVisibleModalFilter(true)}
            >
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
            onPress={() => {}}
            icon={
              <FontAwesome6
                name="cart-shopping"
                size={14}
                color={appColors.white}
              />
            }
            text={cardCount.toString()}
            textColor={appColors.white}
            styles={{
              width: 48,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            fontStyles={{fontSize: 18, lineHeight: 18}}
          />
        </RowComponent>
        {searchValue && (
          <TitleComponent
            size={20}
            flex={0}
            text={`${
              results.length > 0 ? 'Gluten-free' : 'No gluten-free'
            } results for “${searchValue}”`}
          />
        )}
      </SectionComponent>
      {isSearch ? (
        <SectionComponent
          styles={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </SectionComponent>
      ) : (
        <>
          {resultsValue.length > 0 ? (
            <FlatList
              numColumns={2}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              data={resultsValue}
              keyExtractor={(_item, index) => `product${index}`}
              renderItem={({item, index}) => (
                <ProductItemComponent item={item} styles={{marginLeft: 16}} />
              )}
              ListFooterComponent={isLoadmore ? <ActivityIndicator /> : <></>}
              // onEndReached={() => setPage(page + 1)}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchGrocery;
