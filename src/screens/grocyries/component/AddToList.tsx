import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Add} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
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
  RowComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {appInfos} from '../../../constants/appInfos';
import {fontFamilys} from '../../../constants/fontFamily';
import {LoadingModal} from '../../../modals';
import {authSelector} from '../../../redux/reducers/authReducer';
import {shopingListSelector} from '../../../redux/reducers/shopingListReducer';
import {global} from '../../../styles/global';
import {showToast} from '../../../utils/showToast';
import CardScore from './CardScore';
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
    try {
      const res: any = await handleGetData.handleProduct(api);
      if (res && res.length > 0) {
        setListScore(res[0]);
      }
    } catch (error) {
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

  const handleUpdateQuaily = async (type: 'minus' | 'plus', id: number) => {
    const api = `/qtyUpdate`;

    console.log('data: ', {
      item_id: id,
      qty: 1,
      type,
    });
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

      console.log('res:', res);

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

  return (
    <>
      {listScore && (
        <CardScore isHide={!isShowScoreCard} listScore={listScore} />
      )}

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

      <LoadingModal visible={isLoading} />
    </>
  );
};

export default AddToList;
