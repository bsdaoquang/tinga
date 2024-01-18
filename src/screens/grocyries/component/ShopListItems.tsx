import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {groceriesSelector} from '../../../redux/reducers/groceryReducer';
import {GroceryStore, ProductDetail} from '../../../Models/Product';
import {global} from '../../../styles/global';
import {appColors} from '../../../constants/appColors';
import {TextComponent} from '../../../components';
import {fontFamilys} from '../../../constants/fontFamily';

interface Props {
  onChangeShopSelected: (shop_id: number) => void;
}

const ShopListItems = (props: Props) => {
  const {onChangeShopSelected} = props;

  const [shopData, setShopData] = useState<GroceryStore[]>([]);
  const [storeSelected, setStoreSelected] = useState(0);

  const groceryList: ProductDetail[] = useSelector(groceriesSelector);

  useEffect(() => {
    onChangeShopSelected(storeSelected);
  }, [storeSelected]);

  useEffect(() => {
    if (groceryList.length > 0) {
      const items: GroceryStore[] = [];
      groceryList.forEach(item => {
        const index = items.findIndex(
          element => element.shop_id === item.shop_id,
        );
        const total_items = groceryList.filter(
          element => element.shop_id === item.shop_id,
        );
        if (index === -1) {
          const data: GroceryStore = {
            shopname: item.shopname,
            shop_id: item.shop_id,
            total_items: total_items.reduce((a, b) => a + b.qty, 0),
            total_amount: total_items.reduce(
              (a, b) => a + parseFloat(b.price),
              0,
            ),
          };

          items.push(data);
        }
      });

      setShopData(items);
    } else {
      setShopData([]);
    }
  }, [groceryList]);

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
  return (
    <View>
      <FlatList
        data={shopData}
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
                text={`All stores - ${shopData.reduce(
                  (a, b) => a + b.total_items,
                  0,
                )} ($${shopData
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
  );
};

export default ShopListItems;
