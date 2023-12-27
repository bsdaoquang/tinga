import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Add} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import {
  GroceryItem,
  GroceryStore,
  ProductDetail,
} from '../../../Models/Product';
import {Scoredetails} from '../../../Models/Score';
import handleGetData from '../../../apis/productAPI';
import {
  Button,
  ButtonComponent,
  CardContent,
  ChartPieItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {appInfos} from '../../../constants/appInfos';
import {fontFamilys} from '../../../constants/fontFamily';
import {LoadingModal, ModalInfoScore} from '../../../modals';
import {authSelector} from '../../../redux/reducers/authReducer';
import {shopingListSelector} from '../../../redux/reducers/shopingListReducer';
import {global} from '../../../styles/global';
import {showToast} from '../../../utils/showToast';
import ProductItem from './ProductItem';

interface Props {
  isEdit: boolean;
  products: GroceryItem[];
  onChange: () => void;
}

const AddToList = (props: Props) => {
  const {isEdit, products, onChange} = props;

  const [store, setStore] = useState<GroceryStore[]>([]);
  const [storeSelected, setStoreSelected] = useState(0);
  const [directionScroll, setDirectionScroll] = useState('up');
  const [isShowScoreCard, setIsShowScoreCard] = useState(true);
  const [productSelected, setProductSelected] = useState<ProductDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listScore, setListScore] = useState<Scoredetails>();
  const [loadListScore, setLoadListScore] = useState(false);
  const [isVisibleModalInfoScore, setIsVisibleModalInfoScore] = useState(false);

  const navigation: any = useNavigation();
  const auth = useSelector(authSelector);
  const shopingList = useSelector(shopingListSelector);

  useEffect(() => {
    handleGetShops();
    getListScore();
  }, []);

  useEffect(() => {
    const saveToLocal = async () => {
      await AsyncStorage.setItem(
        appInfos.localDataName.shopingList,
        JSON.stringify(shopingList),
      );
    };

    saveToLocal();
  }, [shopingList]);

  useEffect(() => {
    setIsShowScoreCard(directionScroll === 'up' ? true : false);
  }, [directionScroll]);

  useEffect(() => {
    if (products.length > 0) {
      const items: ProductDetail[] = [];

      products.forEach(item => {
        const data = item.products;
        const selectedItems = data.filter(
          element => element.is_checked === '1',
        );

        selectedItems.length > 0 &&
          selectedItems.forEach(selected => items.push(selected));
      });
      setProductSelected(items);

      getListScore();
    }
  }, [products]);

  const getListScore = async () => {
    const api = `/groceryListScore`;
    setLoadListScore(true);
    try {
      const res: any = await handleGetData.handleProduct(api);
      if (res && res.length > 0) {
        setListScore(res[0]);
      }
      setLoadListScore(false);
    } catch (error) {
      setLoadListScore(false);
      console.log(error);
    }
  };

  const handleGetShops = async () => {
    const api = `/groceryStores`;

    try {
      await handleGetData.handleProduct(api).then((res: any) => {
        setStore(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderTabStore = (item: GroceryStore) => {
    return (
      <TouchableOpacity
        key={item.shop_id}
        onPress={() => setStoreSelected(item.shop_id)}
        style={[
          global.tag,
          {
            borderRadius: 100,
            marginLeft: 12,
            marginRight: 0,
            backgroundColor:
              storeSelected === item.shop_id
                ? appColors.success1
                : appColors.white,
          },
        ]}>
        <TextComponent
          flex={0}
          font={
            storeSelected === item.shop_id
              ? fontFamilys.bold
              : fontFamilys.medium
          }
          color={
            storeSelected === item.shop_id ? appColors.text : appColors.gray
          }
          size={12}
          text={`${item.shopname} - ${item.total_items} ($${item.total_amount})`}
        />
      </TouchableOpacity>
    );
  };

  const handleSelectAllProducts = () => {
    // products.forEach(item => {
    //   const data = item.data;
    //   data.length > 0 &&
    //     data.forEach(itemProduc => {
    //       handleAddProduct(itemProduc);
    //     });
    // });
  };

  const handleCheckItemProduct = async (id: number) => {
    const api = `/listItemsCheck`;
    try {
      await handleGetData.handleProduct(api, {item_id: id}, 'post');
      onChange();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateQuaily = async (type: 'minus' | 'plust', id: number) => {
    const api = `/qtyUpdate`;

    try {
      const res: any = await handleGetData.handleProduct(
        api,
        {
          item_id: id,
          qty: 1,
          type,
        },
        'post',
      );

      showToast(res.message);
      onChange();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = async (id: number) => {
    const api = `/listItemsDelete`;
    setIsLoading(true);
    try {
      const res: any = await handleGetData.handleProduct(
        api,
        {item_id: id},
        'post',
      );

      showToast(res.message);
      setIsLoading(false);
      onChange();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleCompleteList = async () => {
    const api = `/completeList`;
    setIsLoading(true);
    await handleGetData
      .handleProduct(api, undefined, 'post')
      .then((res: any) => {
        setIsLoading(false);
        showToast(res.message);
        onChange();
        // navigation.goBack();
      })
      .catch(error => {
        setIsLoading(false);
        showToast(JSON.stringify(error));
      });
  };

  const renderListScore = (item: Scoredetails) => {
    const total =
      item.green_quantity * 1 +
      item.red_quantity * 1 +
      item.orange_quantity * 1;

    return (
      <View>
        <RowComponent>
          <ChartPieItem
            total={`${item.list_score}`}
            size={74}
            fontSize={28}
            data={{
              values: [item.green_line, item.orange_line, item.red_line],
            }}
            radius={0.9}
          />
          <View
            style={{
              flex: 1,
              paddingLeft: 34,
              minHeight: 100,
            }}>
            <RowComponent>
              <View
                style={{
                  backgroundColor: '#E6EECC',
                  padding: 4,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextComponent text="👍" size={12} flex={0} />
              </View>
              <TitleComponent
                text={` ${((item.green_quantity / total) * 100).toFixed(0)}%`}
                size={12}
                flex={0}
              />
              <TextComponent
                text={` (${item.green_quantity}) Great Choices`}
                size={12}
                font={fontFamilys.regular}
              />
            </RowComponent>
            <SpaceComponent height={6} />
            <RowComponent>
              <View
                style={{
                  backgroundColor: '#FFECBF',
                  padding: 4,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextComponent text="👌" size={12} flex={0} />
              </View>
              <TitleComponent
                text={` ${((item.orange_quantity / total) * 100).toFixed(0)}%`}
                size={12}
                flex={0}
              />
              <TextComponent
                text={` (${item.orange_quantity}) Good`}
                size={12}
                font={fontFamilys.regular}
              />
            </RowComponent>

            <SpaceComponent height={6} />
            <RowComponent>
              <View
                style={{
                  backgroundColor: '#FFDBDB',
                  padding: 4,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: 'rotate(180deg)',
                }}>
                <TextComponent text="👍" size={12} flex={0} styles={{}} />
              </View>
              <TitleComponent
                text={` ${((item.red_quantity / total) * 100).toFixed(0)}%`}
                size={12}
                flex={0}
              />
              <TextComponent
                text={` (${item.red_quantity}) Limit`}
                size={12}
                font={fontFamilys.regular}
              />
            </RowComponent>
          </View>
        </RowComponent>
        {auth.is_premium === 0 && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              flex: 0,
              backgroundColor: appColors.white,
              opacity: 0.92,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}>
            <View
              style={{
                width: 24,
                height: 24,
                backgroundColor: appColors.primary,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 12,
              }}>
              <Fontisto name="locked" size={14} color={appColors.white} />
            </View>

            <TextComponent
              text="Upgrade to Premium "
              font={fontFamilys.bold}
              styles={{textDecorationLine: 'underline'}}
              flex={0}
            />
            <TextComponent
              text="for full food ratings"
              font={fontFamilys.bold}
              flex={0}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <SectionComponent>
        {isShowScoreCard && (
          <CardContent
            isShadow
            color={appColors.white}
            styles={{padding: 12, marginVertical: 8, marginBottom: 0}}>
            <RowComponent>
              <RowComponent justify="flex-start" styles={{flex: 1}}>
                <TitleComponent text="List Score" flex={0} size={18} />
                <SpaceComponent width={4} />
                <Button
                  icon={
                    <AntDesign
                      name="infocirlceo"
                      size={14}
                      color={appColors.gray}
                    />
                  }
                  onPress={() => setIsVisibleModalInfoScore(true)}
                />
              </RowComponent>
              <Button
                text="Improve Score"
                textSize={14}
                textColor={appColors.primary}
                onPress={() =>
                  navigation.navigate('ImproveScore', {
                    products: productSelected,
                  })
                }
              />
            </RowComponent>
            <SpaceComponent height={12} />
            {listScore ? renderListScore(listScore) : <></>}
          </CardContent>
        )}
      </SectionComponent>
      <View>
        <FlatList
          data={store}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <TouchableOpacity
              key={'all'}
              onPress={() => setStoreSelected(0)}
              style={[
                global.tag,
                {
                  borderRadius: 100,
                  marginLeft: 12,
                  marginRight: 0,
                  backgroundColor:
                    storeSelected === 0 ? appColors.success1 : appColors.white,
                },
              ]}>
              <TextComponent
                flex={0}
                font={
                  storeSelected === 0 ? fontFamilys.bold : fontFamilys.medium
                }
                color={storeSelected === 0 ? appColors.text : appColors.gray}
                size={12}
                text={`All stores - ${store.reduce(
                  (a, b) => a + b.total_items,
                  0,
                )} ($${store
                  .reduce((a, b) => a + b.total_amount, 0)
                  .toFixed(2)})`}
              />
            </TouchableOpacity>
          }
          keyExtractor={item => `shop${item.shop_id}`}
          renderItem={({item}) => renderTabStore(item)}
        />
      </View>

      <View style={{flex: 1}}>
        <FlatList
          data={products}
          onScroll={event => {
            setDirectionScroll(
              event.nativeEvent.contentOffset.y > 0 ? 'down' : 'up',
            );
          }}
          ListHeaderComponent={
            <RowComponent
              justify="flex-end"
              styles={{paddingHorizontal: 16, marginBottom: 12}}>
              <Button
                text={'Sellec All'}
                onPress={() => handleSelectAllProducts()}
              />
            </RowComponent>
          }
          keyExtractor={item => `product${item.category_id}`}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View style={{marginBottom: 16}}>
              <View style={{paddingHorizontal: 16}}>
                <TextComponent text={item.category_name} />
              </View>
              {item.products.length > 0 &&
                item.products.map(product => (
                  <ProductItem
                    key={`product${product.id}${product.shop_id}`}
                    onChangeCount={type => handleUpdateQuaily(type, product.id)}
                    isEdit={isEdit}
                    handleRemoveItem={() => handleRemoveItem(product.id)}
                    item={product}
                    onSelecteItem={() => handleCheckItemProduct(product.id)}
                    isSelected={product.is_checked === '1'}
                  />
                ))}
            </View>
          )}
        />
      </View>

      <RowComponent
        styles={{
          paddingVertical: 5,
          paddingHorizontal: 16,
        }}>
        <View style={{flex: 1}}>
          <Button
            icon={<Add size={22} color="#13917B" />}
            text="ADD MORE ITEMS"
            textColor="#13917B"
            textSize={14}
            fontStyles={{fontFamily: fontFamilys.bold}}
            onPress={() =>
              navigation.navigate('Explore', {screen: 'ExploreScreen'})
            }
          />
        </View>
        <View style={{flex: 1}}>
          <ButtonComponent
            disable={productSelected.length === 0}
            color="#13917B"
            fontStyles={{fontFamily: fontFamilys.bold, fontSize: 14}}
            textColor={appColors.white}
            text="COMPLETE MY LIST"
            onPress={handleCompleteList}
          />
        </View>
      </RowComponent>
      <ModalInfoScore
        visible={isVisibleModalInfoScore}
        onClose={() => setIsVisibleModalInfoScore(false)}
      />
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default AddToList;
