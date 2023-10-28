import {useNavigation} from '@react-navigation/native';
import {Add} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SectionList,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Product} from '../../../Models/Product';
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
import {fontFamilys} from '../../../constants/fontFamily';
import {global} from '../../../styles/global';
import {showToast} from '../../../utils/showToast';
import ProductItem from './ProductItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  addList,
  shopingListSelector,
} from '../../../redux/reducers/shopingListReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appInfos} from '../../../constants/appInfos';
import {LoadingModal} from '../../../modals';
import {UserChoose} from '../../../Models/UserChoose';
import {
  handleCalcTotal,
  handleCalcTotalByTarget,
} from '../../../utils/handleCalcTotal';

interface Props {
  isEdit: boolean;
  selectedItems: (items: Product[]) => void;
}

const AddToList = (props: Props) => {
  const {isEdit, selectedItems} = props;

  const [store, setStore] = useState<UserChoose[]>([]);
  const [storeSelected, setStoreSelected] = useState('all');
  const [directionScroll, setDirectionScroll] = useState('up');
  const [isShowScoreCard, setIsShowScoreCard] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [productSelected, setProductSelected] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const shopingList = useSelector(shopingListSelector);

  useEffect(() => {
    getAllProducts();
    handleGetShops();
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
    selectedItems(productSelected);
  }, [productSelected]);

  useEffect(() => {
    setIsShowScoreCard(directionScroll === 'up' ? true : false);
  }, [directionScroll]);

  const handleGetShops = async () => {
    const api = `/shops`;

    try {
      await handleGetData.handleProduct(api).then((res: any) => {
        setStore(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = (item: Product, count: number) => {
    const items: any[] = productSelected;

    const index = productSelected.findIndex(element => element.id === item.id);

    if (index !== -1) {
      items.splice(index, 1);
    } else {
      items.push({
        ...item,
        count,
      });
    }

    setProductSelected([...items]);
  };

  const getAllProducts = async () => {
    const api = `/getProductListing`;
    setIsLoading(true);
    try {
      await handleGetData
        .handleProduct(
          api,
          {
            category_id: '0',
            subcategory_id: '0',
            sub_subcategory_id: '0',
            offset: '0',
          },
          'post',
        )
        .then((res: any) => {
          setProducts(res);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      setIsLoading(false);
      console.log(error);
      showToast('Can not get product list');
    }
  };

  const renderTabStore = (item: any) => {
    const totalItems = productSelected.filter(
      element => element.shopname === item.name,
    );

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => setStoreSelected(item.id)}
        style={[
          global.tag,
          {
            borderRadius: 100,
            marginLeft: 12,
            marginRight: 0,
            backgroundColor:
              storeSelected === item.id ? appColors.success1 : appColors.white,
          },
        ]}>
        <TextComponent
          flex={0}
          font={
            storeSelected === item.id ? fontFamilys.bold : fontFamilys.medium
          }
          color={storeSelected === item.id ? appColors.text : appColors.gray}
          size={12}
          text={`${item.name} - ${
            productSelected.length
          } ($${handleCalcTotalByTarget(totalItems, 'price')})`}
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

  const handleAddProductToList = async () => {
    console.log(productSelected);
    // dispatch(addList(productSelected));

    // setProductSelected([]);
    // navigation.navigate('ShopingHistory');
  };

  const onRemoveItemFromList = (item: Product) => {};

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
                  onPress={() => {}}
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
            <RowComponent>
              <ChartPieItem
                total={67}
                size={74}
                fontSize={28}
                data={{values: [70, 20, 10]}}
                radius={0.9}
              />
              <View
                style={{
                  flex: 1,
                  paddingLeft: 34,
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
                  <TitleComponent text={` 50%`} size={12} flex={0} />
                  <TextComponent
                    text={` (14) Great Choices`}
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
                  <TitleComponent text={` 20%`} size={12} flex={0} />
                  <TextComponent
                    text={` (12) Good`}
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
                  <TitleComponent text={` 10%`} size={12} flex={0} />
                  <TextComponent
                    text={` (4) Limit`}
                    size={12}
                    font={fontFamilys.regular}
                  />
                </RowComponent>
              </View>
            </RowComponent>
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
              onPress={() => setStoreSelected('all')}
              style={[
                global.tag,
                {
                  borderRadius: 100,
                  marginLeft: 12,
                  marginRight: 0,
                  backgroundColor:
                    storeSelected === 'all'
                      ? appColors.success1
                      : appColors.white,
                },
              ]}>
              <TextComponent
                flex={0}
                font={
                  storeSelected === 'all'
                    ? fontFamilys.bold
                    : fontFamilys.medium
                }
                color={
                  storeSelected === 'all' ? appColors.text : appColors.gray
                }
                size={12}
                text={`All stores - ${
                  productSelected.length
                } ($${handleCalcTotalByTarget(productSelected, 'price')})`}
              />
            </TouchableOpacity>
          }
          renderItem={({item}) => renderTabStore(item)}
        />
      </View>

      <View style={{flex: 1}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
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
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <ProductItem
                isEdit={isEdit}
                handleRemoveItem={() => onRemoveItemFromList(item)}
                item={item}
                onSelecteItem={count => handleAddProduct(item, count)}
                isSelected={
                  productSelected.find(element => element.id === item.id)
                    ? true
                    : false
                }
              />
            )}
          />
        )}
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
            onPress={() => navigation.navigate('AddNewScreen')}
          />
        </View>
        <View style={{flex: 1}}>
          <ButtonComponent
            disable={productSelected.length === 0}
            color="#13917B"
            fontStyles={{fontFamily: fontFamilys.bold, fontSize: 14}}
            textColor={appColors.white}
            text="COMPLETE MY LIST"
            onPress={handleAddProductToList}
          />
        </View>
      </RowComponent>
      <LoadingModal visible={isUpdating} />
    </>
  );
};

export default AddToList;
