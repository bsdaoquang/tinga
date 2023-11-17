import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Add} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {Product} from '../../../Models/Product';
import {UserChoose} from '../../../Models/UserChoose';
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
import {LoadingModal} from '../../../modals';
import {shopingListSelector} from '../../../redux/reducers/shopingListReducer';
import {global} from '../../../styles/global';
import {handleCalcTotalByTarget} from '../../../utils/handleCalcTotal';
import {showToast} from '../../../utils/showToast';
import ProductItem from './ProductItem';
import {authSelector} from '../../../redux/reducers/authReducer';
import Fontisto from 'react-native-vector-icons/Fontisto';

interface Props {
  isEdit: boolean;
  selectedItems: (items: Product[]) => void;
  products: Product[];
  onRemoveItem: (id: number) => void;
}

const AddToList = (props: Props) => {
  const {isEdit, selectedItems, products, onRemoveItem} = props;

  const [store, setStore] = useState<UserChoose[]>([]);
  const [storeSelected, setStoreSelected] = useState('all');
  const [directionScroll, setDirectionScroll] = useState('up');
  const [isShowScoreCard, setIsShowScoreCard] = useState(true);
  const [productSelected, setProductSelected] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigation: any = useNavigation();
  const auth = useSelector(authSelector);
  const shopingList = useSelector(shopingListSelector);

  useEffect(() => {
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

  // const getAllProducts = async () => {
  //   const api = `/getProductListing`;
  //   setIsLoading(true);
  //   try {
  //     await handleGetData
  //       .handleProduct(
  //         api,
  //         {
  //           category_id: '0',
  //           subcategory_id: '0',
  //           sub_subcategory_id: '0',
  //           offset: '0',
  //         },
  //         'post',
  //       )
  //       .then((res: any) => {
  //         setProducts(res);
  //         setIsLoading(false);
  //       });
  //   } catch (error) {
  //     setIsLoading(false);
  //     setIsLoading(false);
  //     console.log(error);
  //     showToast('Can not get product list');
  //   }
  // };

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

  const handleCompleteList = async () => {
    setIsUpdating(true);
    const api = `/completeList`;

    await handleGetData
      .handleProduct(api, undefined, 'post')
      .then(res => {
        setIsUpdating(false);
        navigation.goBack();
        showToast('Completed list');
      })
      .catch(error => {
        showToast(JSON.stringify(error));
      });
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
            <View>
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
            keyExtractor={() => `${Math.random() * 1000000000}product`}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <ProductItem
                isEdit={isEdit}
                handleRemoveItem={() => onRemoveItem(item.id)}
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
      <LoadingModal visible={isUpdating} />
    </>
  );
};

export default AddToList;
