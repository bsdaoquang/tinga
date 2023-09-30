import {useNavigation} from '@react-navigation/native';
import {Add} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {SectionList, TouchableOpacity, View} from 'react-native';
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
import {useDispatch} from 'react-redux';
import {addList} from '../../../redux/reducers/shopingListReducer';

const AddToList = () => {
  const [store, setStore] = useState('all');
  const [directionScroll, setDirectionScroll] = useState('up');
  const [isShowScoreCard, setIsShowScoreCard] = useState(true);
  const [products, setProducts] = useState<
    {
      category: string;
      data: Product[];
    }[]
  >([]);
  const [productSelected, setProductSelected] = useState<Product[]>([]);
  const [isVisibleModalEdit, setIsVisibleModalEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setProducts([
      {
        category: 'Produce',
        data: [
          {
            created_on: 1695915692,
            id: 221323,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/s/products/L6fdccENsmesllHGQA2uvrj9sz10eMiJq3qPT5bj.jpg',
            name: 'Foco Roasted Coconut Juice',
            old_price: '0.00',
            price: '0.00',
            shopname: 'WalMart',
          },
        ],
      },
      {
        category: 'Bread & Bakery',
        data: [
          {
            created_on: 1695724020,
            id: 224136,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/s/products/QOoNbZRxnckJEFZ1ST7AyLGElGpf2NJJr8togqaJ.jpg',
            name: 'Pure Sesame Oil',
            old_price: '0.00',
            price: '5.79',
            shopname: 'Metro',
          },
          {
            created_on: 1695543572,
            id: 209021,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/s/products/9eRAFnogva0n5v26Vtjy5Iqd93Iy4LafYxQYo9AO.jpg',
            name: 'Great Value Cream Cheese',
            old_price: '0.00',
            price: '20.00',
            shopname: 'WalMart',
          },
          {
            created_on: 1695540631,
            id: 209828,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/s/products/AhioqP72OSKhs4pTiKNePcGQIM6KnrkUYLrZMhb4.jpg',
            name: 'Great Value Fat Free Cottage Cheese',
            old_price: '0.00',
            price: '30.00',
            shopname: 'WalMart',
          },
          {
            created_on: 1695065192,
            id: 114208,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/lbXNSx9W1oAtiiyNGT7hEKkR8nVxu07qY6REQ6L3.jpg',
            name: 'Apple Jacks Cereal, 345 g',
            old_price: '4.00',
            price: '4.67',
            shopname: 'WalMart',
          },
          {
            created_on: 1695065132,
            id: 114209,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/tHZmXS7PPEwZDlxdMoRjzjhK2Ul4Me6iNexwSOJO.jpg',
            name: 'Whole Grain Cereal, 400 g',
            old_price: '0.00',
            price: '4.47',
            shopname: 'WalMart',
          },
          {
            created_on: 1694852012,
            id: 223390,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/s/products/tEOphKEq8pWf1w4OTAFsAT1ppc2nPKf3VDv9D6Qc.jpg',
            name: 'Melona Mango Ice Bar',
            old_price: '0.00',
            price: '0.00',
            shopname: 'WalMart',
          },
          {
            created_on: 1694772392,
            id: 222165,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/s/products/RCYLLaZnOizGFhtJBUYcmXeEf7gvmNCWTRT8aWO9.jpg',
            name: 'Activia Yogurt with Probiotics, Mango Flavour',
            old_price: '0.00',
            price: '0.00',
            shopname: 'WalMart',
          },
          {
            created_on: 1693650753,
            id: 6209,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/rW7QWcSX6vUZVgqiRWRJAc9JZlcPm44pU5X3Dcww.jpg',
            name: ' White Rice, Instant Long Grain, 1.4kg',
            old_price: '3.99',
            price: '7.49',
            shopname: 'Metro',
          },
          {
            created_on: 1693650452,
            id: 6258,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/QptswtIQGkNBpSb3ZkfOXeL1ZHdG6ik8cdsobIn4.jpg',
            name: 'Traditional Greek style light feta cheese, 400 G',
            old_price: '0.00',
            price: '10.69',
            shopname: 'Metro',
          },
        ],
      },
      {
        category: 'Dairy & Alternatives',
        data: [
          {
            created_on: 1693650333,
            id: 6285,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/GcGtGR5QSkxudm4fEw3b2iVHaYhMsFnJhHAno0XW.jpg',
            name: 'Sliced chipotle and habanero flavoured Havarti cheese, 165 G',
            old_price: '0.00',
            price: '6.49',
            shopname: 'Metro',
          },
          {
            created_on: 1693650272,
            id: 6289,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/SzWBLc62AurjRwhc0Rq1uSq20uN3XjSxQodCZpKx.jpg',
            name: 'Gouda cheese snack bars, 8 UN - 168 G',
            old_price: '0.00',
            price: '0.00',
            shopname: 'Metro',
          },
          {
            created_on: 1693650212,
            id: 6406,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/tNM8rCe0VYIF5UC6uF4jLUJhbgzz8yhmICGhP5w2.jpg',
            name: 'Plain English muffins, 6 UN - 340 G',
            old_price: '0.00',
            price: '2.79',
            shopname: 'Metro',
          },
          {
            created_on: 1693649673,
            id: 6453,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/IoSTw2vVfkhQukCKnZtbnpwXMXLclMGXPSPUTdcQ.jpg',
            name: 'Sliced Havarti Cheese, 170 G',
            old_price: '0.00',
            price: '6.49',
            shopname: 'Metro',
          },
          {
            created_on: 1693648292,
            id: 6567,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/H5lkmjDxRfNZE6V3nKwG4VLo41GpPEkyv1FYUqhB.jpg',
            name: 'Becel Light Margarine, 454g',
            old_price: '3.79',
            price: '3.49',
            shopname: 'Metro',
          },
          {
            created_on: 1693648233,
            id: 6573,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/XuZt2iOwjdGejh71PftWXNzUa6BkHEDXVbpwfvGB.jpg',
            name: 'Becel Salt-Free Margarine, 454g',
            old_price: '0.00',
            price: '3.49',
            shopname: 'Metro',
          },
          {
            created_on: 1693647932,
            id: 6622,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/F4hG6EDDquFn9F1lGtONgoCvLwXli2AjS9QYQd84.jpg',
            name: 'Strawberry and Peach Frozen Yogurt Bars, Real Fruit, 12X50 ML',
            old_price: '6.99',
            price: '4.99',
            shopname: 'Metro',
          },
          {
            created_on: 1693647813,
            id: 6645,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/DbsOp49NYwAEQ4GGBYEezDSwtsvenUYN7GMz4HkQ.jpg',
            name: 'Classic mortadella, 175 G',
            old_price: '0.00',
            price: '5.49',
            shopname: 'Metro',
          },
          {
            created_on: 1693647753,
            id: 6647,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/a90HQw29tsEyHsAW52DccvTlKCrgPUyhuHFwX5UL.jpg',
            name: 'Sliced hot calabrese salami, 125 G',
            old_price: '6.29',
            price: '4.99',
            shopname: 'Metro',
          },
          {
            created_on: 1693647692,
            id: 6649,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/XvZ2mG1RiBvbrGkYcSaEZ3gOjsn3SdLDM0acekxJ.jpg',
            name: 'Sliced prosciutto salami, 125 G',
            old_price: '6.49',
            price: '4.99',
            shopname: 'Metro',
          },
          {
            created_on: 1693647572,
            id: 6653,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/aw55d3VrLTGtImUok80nHUq2fcIiTbeNyldevynh.jpg',
            name: 'Mastro Hot Calabrese Salami, (Lactose and gluten free) 300g',
            old_price: '0.00',
            price: '0.00',
            shopname: 'Metro',
          },
          {
            created_on: 1693647512,
            id: 6655,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/sweTRlZRoQmw9AU85Kyry4FClsdIBpgarEcKb5V0.jpg',
            name: 'Lactose and gluten free sopressata salami, 300 G',
            old_price: '0.00',
            price: '0.00',
            shopname: 'Metro',
          },
          {
            created_on: 1693647453,
            id: 6656,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/FBSEnsL4ahITyPFRtmhKWSG3G1zMh4yd4OHL1yvL.jpg',
            name: 'Lactose and gluten free casalingo salami, 375 G',
            old_price: '0.00',
            price: '0.00',
            shopname: 'Metro',
          },
          {
            created_on: 1693647393,
            id: 6657,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/gbROewW73Ehw8jvDJdOrFa6qdcqhc4aWAIjrtg1X.jpg',
            name: 'Gluten and lactose free spicy casalingo salami, 375 G',
            old_price: '0.00',
            price: '0.00',
            shopname: 'Metro',
          },
          {
            created_on: 1693647332,
            id: 6658,
            image:
              'https://tinga-storage.s3.us-east-2.amazonaws.com/p/products/0OUnGx4XgNAFONpD6QuecWzc7ADpi1Tx8vHvSeLp.jpg',
            name: 'Mastro Salametti Salami, (Lactose and Gluten Free) 300g',
            old_price: '0.00',
            price: '0.00',
            shopname: 'Metro',
          },
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    setIsShowScoreCard(directionScroll === 'up' ? true : false);
  }, [directionScroll]);

  const handleAddProduct = (item: Product) => {
    const items: any[] = productSelected;

    const index = productSelected.findIndex(element => element.id === item.id);

    if (index !== -1) {
      items.splice(index, 1);
    } else {
      items.push({
        ...item,
        count: 1,
      });
    }

    setProductSelected([...items]);
  };

  const storeData = [
    {id: 'wallmart', title: 'Wallmart', totalItem: 3, totalPayment: 14.5},
    {id: 'wholeFoods', title: 'Whole Foods', totalItem: 1, totalPayment: 14.5},
  ];

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
          console.log(res);
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showToast('Can not get product list');
    }
  };

  const renderTabStore = (item: any) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => setStore(item.id)}
      style={[
        global.tag,
        {
          borderRadius: 100,
          marginLeft: 12,
          marginRight: 0,
          backgroundColor:
            store === item.id ? appColors.success1 : appColors.white,
        },
      ]}>
      <TextComponent
        flex={0}
        font={store === item.id ? fontFamilys.bold : fontFamilys.medium}
        color={store === item.id ? appColors.text : appColors.gray}
        size={12}
        text={`${item.title} - ${item.totalItem} ($${item.totalPayment.toFixed(
          2,
        )})`}
      />
    </TouchableOpacity>
  );

  const handleSelectAllProducts = () => {
    products.forEach(item => {
      const data = item.data;

      data.length > 0 &&
        data.forEach(itemProduc => {
          handleAddProduct(itemProduc);
        });
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
      {/* <View>
        <FlatList
          data={storeData}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={renderTabStore({
            id: 'all',
            title: 'All',
            totalItem: productSelected.reduce((a, b) => a + (b.count ?? 0), 0),
            totalPayment: handleCalcTotal(productSelected),
          })}
          renderItem={({item}) => renderTabStore(item)}
        />
      </View>*/}

      <View style={{flex: 1}}>
        <SectionList
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
          onScroll={event => {
            setDirectionScroll(
              event.nativeEvent.contentOffset.y > 0 ? 'down' : 'up',
            );
          }}
          showsVerticalScrollIndicator={false}
          sections={products}
          keyExtractor={(item, index) => `product${item.id + index}`}
          renderItem={({item}) => (
            <ProductItem
              item={item}
              onSelecteItem={() => handleAddProduct(item)}
              isSelected={
                productSelected.find(element => element.id === item.id)
                  ? true
                  : false
              }
            />
          )}
          renderSectionHeader={({section: {category}}) => (
            <View style={{paddingHorizontal: 16}}>
              <TitleComponent
                text={category}
                size={14}
                font={fontFamilys.bold}
              />
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
            onPress={() => {}}
          />
        </View>
        <View style={{flex: 1}}>
          <ButtonComponent
            disable={productSelected.length === 0}
            color="#13917B"
            fontStyles={{fontFamily: fontFamilys.bold, fontSize: 14}}
            textColor={appColors.white}
            text="COMPLETE MY LIST"
            onPress={() => {
              dispatch(addList(productSelected));
              setProductSelected([]);
              navigation.navigate('ShopingHistory');
            }}
          />
        </View>
      </RowComponent>
    </>
  );
};

export default AddToList;
