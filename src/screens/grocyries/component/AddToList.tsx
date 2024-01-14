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
  const [productSelected, setProductSelected] = useState<ProductDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listScore, setListScore] = useState<Scoredetails>();
  const [productsByStoreId, setproductsByStoreId] = useState<GroceryItem[]>([]);

  const navigation: any = useNavigation();

  useEffect(() => {
    handleGetShops();
    getListScore();
  }, []);

  useEffect(() => {
    if (storeSelected !== 0) {
      const data: GroceryItem[] = [];

      products.forEach(items => {
        data.push({
          ...items,
          products: items.products.filter(
            element => element.shop_id === storeSelected,
          ),
        });
      });

      setproductsByStoreId(data);
    } else {
      setproductsByStoreId(products);
    }
  }, [storeSelected, products]);

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
    const items = [...productSelected];
    products.forEach(item => {
      const data = item.products;
      data.forEach(product => {
        const index = productSelected.findIndex(
          element =>
            element.id === product.id && element.shop_id === product.shop_id,
        );
        index === -1 && items.push(product);
      });
    });

    setProductSelected(items);
  };

  const handleCompleteList = async () => {
    const items: {item_id: number; qty: number}[] = [];
    productSelected.forEach(item => {
      items.push({
        item_id: item.id,
        qty: item.qty,
      });
    });

    const api = `/completeList`;
    setIsLoading(true);
    try {
      const res: any = await handleGetData.handleProduct(api, items, 'post');

      setIsLoading(false);
      showToast(res.message);
      handleGetShops();
      onChange();
      // // navigation.goBack();
    } catch (error) {
      console.log(`Can not completed list ${error}`);
      setIsLoading(false);
    }
  };

  const removeItemFromList = async (id: number) => {
    const api = `/listItemsDelete`;

    setIsLoading(true);
    try {
      await handleGetData.handleProduct(api, {item_id: id}, 'post');
      onChange();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      console.log(`Can not remove item from list ${error}`);
      setIsLoading(false);
    }
  };

  const handleToggleProduct = (item: ProductDetail, qty: number) => {
    item.qty = qty;
    const items = [...productSelected];
    const index = items.findIndex(
      element => element.id === item.id && element.shop_id === item.shop_id,
    );

    if (index !== -1) {
      items.splice(index, 1);
    } else {
      items.push(item);
    }

    setProductSelected(items);
  };

  const handleChangeQuality = (
    item: ProductDetail,
    index: number,
    qty: number,
  ) => {
    item.qty = qty;
    const data = [...productsByStoreId];
    const dataProducts = data[index].products;

    const indexOfItem = dataProducts.findIndex(
      element => element.id === item.id && element.shop_id === item.shop_id,
    );

    if (indexOfItem !== -1) {
      dataProducts[indexOfItem] = item;

      setproductsByStoreId(data);
    }
  };

  return (
    <>
      <View style={{flex: 1}}>
        <FlatList
          data={productsByStoreId}
          ListHeaderComponent={
            <>
              <View>
                {listScore && <CardScore listScore={listScore} />}
                <FlatList
                  data={store}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ListHeaderComponent={
                    <>
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
                              storeSelected === 0
                                ? appColors.success1
                                : appColors.white,
                          },
                        ]}>
                        <TextComponent
                          flex={0}
                          font={
                            storeSelected === 0
                              ? fontFamilys.bold
                              : fontFamilys.medium
                          }
                          color={
                            storeSelected === 0
                              ? appColors.text
                              : appColors.gray
                          }
                          size={12}
                          text={`All stores - ${store.reduce(
                            (a, b) => a + b.total_items,
                            0,
                          )} ($${store
                            .reduce((a, b) => a + b.total_amount, 0)
                            .toFixed(2)})`}
                        />
                      </TouchableOpacity>
                    </>
                  }
                  keyExtractor={item => `shop${item.shop_id}`}
                  renderItem={({item}) => renderTabStore(item)}
                />
              </View>
              {!isEdit && (
                <RowComponent
                  justify="flex-end"
                  styles={{paddingHorizontal: 16, marginBottom: 12}}>
                  <Button
                    text={'Select All'}
                    onPress={() => handleSelectAllProducts()}
                  />
                </RowComponent>
              )}
            </>
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
                    isEdit={isEdit}
                    item={product}
                    onSelecteItem={(count: number) =>
                      handleToggleProduct(product, count)
                    }
                    onChangeQuality={(qty: number) =>
                      handleChangeQuality(product, index, qty)
                    }
                    onRemoveItem={() => removeItemFromList(product.id)}
                    isSelected={
                      productSelected.findIndex(
                        element =>
                          element.id === product.id &&
                          element.shop_id === product.shop_id,
                      ) !== -1
                    }
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
