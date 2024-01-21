import {useNavigation} from '@react-navigation/native';
import {Add} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {SectionList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ProductDetail} from '../../../Models/Product';
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
import {
  groceriesSelector,
  updateGroceryList,
  updateQuatity,
} from '../../../redux/reducers/groceryReducer';
import {showToast} from '../../../utils/showToast';
import CardScore from './CardScore';
import ProductItem from './ProductItem';
import ShopListItems from './ShopListItems';
import axios from 'axios';

interface Props {
  isEdit: boolean;
}

interface Section {
  title: string;
  data: ProductDetail[];
}

const AddToList = (props: Props) => {
  const {isEdit} = props;

  const [storeSelected, setStoreSelected] = useState(0);
  const [productSelected, setProductSelected] = useState<ProductDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sectionData, setSectionData] = useState<Section[]>([]);

  const navigation: any = useNavigation();
  const groceryList: ProductDetail[] = useSelector(groceriesSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    const items: Section[] = [];
    groceryList.forEach(item => {
      const catIndex = items.findIndex(
        element => element.title === item.category_name,
      );
      if (catIndex === -1) {
        items.push({
          title: item.category_name,
          data: [],
        });
      }
    });

    items.forEach(group => {
      const data = groceryList.filter(
        element => element.category_name === group.title,
      );

      group.data = data;
    });

    setSectionData(items);
  }, [groceryList]);

  const handleSelectAllProducts = () => {
    const items = [...productSelected];
    groceryList.forEach(item => {
      const index = productSelected.findIndex(
        element => element.id === item.id,
      );

      index === -1 && items.push(item);
    });
    setProductSelected(items);
  };

  const handleCompleteList = async () => {
    let items = ``;

    productSelected.forEach((item, index) => {
      items += `{"item_id": ${item.id},"qty": ${
        item.qty ? item.qty : 1
      },"shop_id": ${item.shop_id}} ${
        index < productSelected.length - 1 ? ',' : ''
      }`;
    });

    const api = `/completeListProductwise`;
    const data = new FormData();
    data.append('item_ids', `[${items}]`);
    setIsLoading(true);
    try {
      const res: any = await handleGetData.handleProduct(
        api,
        data,
        'post',
        true,
      );

      setIsLoading(false);
      if (res && res.success) {
        // remove item after add list
        productSelected.forEach(item => dispatch(updateGroceryList(item)));
        setProductSelected([]);
      } else {
        showToast(res.message);
      }
    } catch (error) {
      console.log(error);
      console.log(`Can not completed list ${error}`);
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

  return (
    <>
      <View style={{flex: 1}}>
        <SectionList
          ListHeaderComponent={
            groceryList.length > 0 ? (
              <>
                <View>
                  <CardScore />
                  <ShopListItems
                    onChangeShopSelected={val => setStoreSelected(val)}
                  />
                </View>
                {!isEdit && (
                  <RowComponent
                    justify="flex-end"
                    styles={{paddingHorizontal: 16, marginBottom: 12}}>
                    <Button
                      text={
                        productSelected.length !== groceryList.length
                          ? 'Select All'
                          : 'Unselected all'
                      }
                      onPress={() =>
                        productSelected.length !== groceryList.length
                          ? handleSelectAllProducts()
                          : setProductSelected([])
                      }
                    />
                  </RowComponent>
                )}
              </>
            ) : null
          }
          sections={sectionData}
          renderSectionHeader={({section: {title}}) =>
            storeSelected == 0 ? (
              <View style={{paddingHorizontal: 16}}>
                <TextComponent text={title} />
              </View>
            ) : (
              <></>
            )
          }
          keyExtractor={(item, _index) => `product${item.id}${item.shop_id}`}
          renderItem={({item, index}) =>
            storeSelected === 0 || storeSelected === item.shop_id ? (
              <ProductItem
                key={`product${item.id}${item.shop_id}`}
                isEdit={isEdit}
                item={item}
                onSelecteItem={(count: number) =>
                  handleToggleProduct(item, count)
                }
                onRemoveItem={() => dispatch(updateGroceryList(item))}
                isSelected={
                  productSelected.findIndex(
                    element =>
                      element.id === item.id &&
                      element.shop_id === item.shop_id,
                  ) !== -1
                }
              />
            ) : (
              <></>
            )
          }
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
            disable={productSelected.length === 0 || isEdit}
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
