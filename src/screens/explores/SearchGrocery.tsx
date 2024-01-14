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
import {Product} from '../../Models/Product';
import handleGetData from '../../apis/productAPI';
import {
  Button,
  ButtonComponent,
  Container,
  ProductItemComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {global} from '../../styles/global';
import ModalizeFilter from '../../modals/ModalizeFilter';

const SearchGrocery = ({navigation, route}: any) => {
  const {searchKey}: {searchKey: string} = route.params;
  const [searchValue, setSearchValue] = useState(searchKey ?? '');
  const [cardCount, setCardCount] = useState(0);
  const [resultsValue, setResultsValue] = useState<Product[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadmore, setIsLoadmore] = useState(false);
  const [loadmoreable, setLoadmoreable] = useState(true);
  const [isVisibleModalFillter, setIsVisibleModalFillter] = useState(false);

  useEffect(() => {
    getCardCount();
  }, []);

  useEffect(() => {
    setPage(1);
    if (searchValue && searchValue.length >= 3) {
      searchProduct();
    } else {
      setResultsValue([]);
    }
  }, [searchValue]);

  useEffect(() => {
    searchValue && resultsValue.length > 0
      ? handleLoadmore()
      : setResultsValue([]);
  }, [page]);

  const searchProduct = async () => {
    const api = `/searchGroceriesList`;
    const data = {
      search: searchValue,
      page: 1,
    };

    setIsSearch(true);

    try {
      const res: any = await handleGetData.handleProduct(api, data, 'post');
      res && res.length > 0 && setResultsValue(res);

      setIsSearch(false);
    } catch (error) {
      console.log(`Error search product ${error}`);
      setIsSearch(false);
    }
  };

  const handleLoadmore = async () => {
    const api = `/searchGroceriesList`;
    const data = {
      search: searchValue,
      page,
    };
    setIsLoadmore(true);

    try {
      const res: any = await handleGetData.handleProduct(api, data, 'post');
      if (res && res.length > 0) {
        const data = [...resultsValue];
        res.forEach((item: any) => data.push(item));
        setResultsValue(data);
        setIsLoadmore(false);
      } else {
        setLoadmoreable(false);
        setIsLoadmore(false);
      }
    } catch (error) {
      console.log(`Error search product ${error}`);
      setLoadmoreable(false);
      setIsLoadmore(false);
    }
  };

  const getCardCount = async () => {
    const api = `/getProductGroceryCount`;
    try {
      const res: any = await handleGetData.handleProduct(api);
      res && setCardCount(res);
    } catch (error) {
      console.log(`get card count ${error}`);
    }
  };

  return (
    <Container
      back
      right={
        <Button
          icon={<AddSquare size={24} color={appColors.text3} variant="Bold" />}
          onPress={() => navigation.navigate('AddNewScreen')}
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
            onPress={() =>
              navigation.navigate('Grocery List', {screen: 'GroceryScreen'})
            }
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
            text={`Results for “${searchValue}”`}
          />
        )}
      </SectionComponent>
      {searchValue ? (
        isSearch ? (
          <SectionComponent
            styles={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={'#32645B'} size={35} />
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
                  <ProductItemComponent
                    key={`item${item.id}${index}${item.shopname}`}
                    item={item}
                    styles={{marginLeft: 16}}
                  />
                )}
                removeClippedSubviews
                initialNumToRender={10}
                onEndReachedThreshold={5}
                ListFooterComponent={
                  isLoadmore ? (
                    <ActivityIndicator />
                  ) : loadmoreable ? (
                    <></>
                  ) : (
                    <RowComponent>
                      <TextComponent flex={0} text="End of data" />
                    </RowComponent>
                  )
                }
                onEndReached={() => loadmoreable && setPage(page + 1)}
              />
            ) : (
              <SectionComponent
                styles={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextComponent
                  text={`Can’t find what you’re looking for?`}
                  flex={0}
                />
                <RowComponent
                  styles={{marginTop: 18}}
                  onPress={() => setIsVisibleModalFillter(true)}>
                  <TitleComponent
                    flex={0}
                    text="Edit your filters"
                    styles={{textDecorationLine: 'underline'}}
                  />
                </RowComponent>
                <TextComponent
                  text={`or help us grow our database.`}
                  flex={0}
                />
                <RowComponent
                  styles={{marginTop: 18}}
                  onPress={() => {
                    navigation.navigate('AddNewScreen');
                  }}>
                  <AddSquare size={22} color={appColors.text} variant="Bold" />
                  <SpaceComponent width={8} />
                  <TitleComponent
                    flex={0}
                    text="Add Missing Product"
                    styles={{textDecorationLine: 'underline'}}
                  />
                </RowComponent>
              </SectionComponent>
            )}
          </>
        )
      ) : null}

      <ModalizeFilter
        visible={isVisibleModalFillter}
        onClose={() => setIsVisibleModalFillter(false)}
      />
    </Container>
  );
};

export default SearchGrocery;
