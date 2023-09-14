import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SectionList,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Product} from '../../Models/Product';
import {
  Button,
  ButtonComponent,
  CardContent,
  ChartPieItem,
  Container,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilys} from '../../constants/fontFamily';
import {global} from '../../styles/global';
import ProductItem from './component/ProductItem';
import {handleCalcTotal} from '../../utils/handleCalcTotal';
import {Add} from 'iconsax-react-native';
import {ModalizeEditShopList} from '../../modals';

const GroceryScreen = ({navigation}: any) => {
  const [store, setStore] = useState('all');
  const [directionScroll, setDirectionScroll] = useState('up');
  const [isShowScoreCard, setIsShowScoreCard] = useState(true);
  const [productSelected, setProductSelected] = useState<Product[]>([]);
  const [isVisibleModalEdit, setIsVisibleModalEdit] = useState(false);

  useEffect(() => {
    setIsShowScoreCard(directionScroll === 'up' ? true : false);
  }, [directionScroll]);

  const handleAddProduct = (item: Product, count: number) => {
    const items = [...productSelected];
    items.push({
      ...item,
      count,
    });

    setProductSelected(items);
  };

  const handleRemoveItem = (item: Product) => {
    const index = productSelected.findIndex(element => element.id === item.id);

    if (index >= 0) {
      const items = [...productSelected];
      items.splice(index, 1);

      setProductSelected(items);
    }
  };

  const storeData = [
    {id: 'wallmart', title: 'Wallmart', totalItem: 3, totalPayment: 14.5},
    {id: 'wholeFoods', title: 'Whole Foods', totalItem: 1, totalPayment: 14.5},
  ];

  const products: {
    title: string;
    data: Product[];
  }[] = [
    {
      title: 'Produce',
      data: [
        {
          id: '1',
          title: 'Item 1',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 2.99,
          imageUrl: '',
        },
      ],
    },
    {
      title: 'Bread & Bakery',
      data: [
        {
          id: '2',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 4.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: '3',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
      ],
    },
    {
      title: 'Dairy & Alternatives',
      data: [
        {
          id: 'egg',
          title: 'Eggs',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 4.99,
          imageUrl:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffood.unl.edu%2Fhow-avoid-green-ring-hard-boiled-egg-yolks&psig=AOvVaw2mF5phXPK2oCWakvaPH0qP&ust=1694796949087000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKCRyuPIqoEDFQAAAAAdAAAAABAE',
        },
      ],
    },
    {
      title: 'Produce',
      data: [
        {
          id: '4',
          title: 'Item 1',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 2.99,
          imageUrl: '',
        },
      ],
    },
    {
      title: 'Bread & Bakery',
      data: [
        {
          id: '5',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 4.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: '6',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
      ],
    },
    {
      title: 'Dairy & Alternatives',
      data: [
        {
          id: '7',
          title: 'Eggs',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 4.99,
          imageUrl:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffood.unl.edu%2Fhow-avoid-green-ring-hard-boiled-egg-yolks&psig=AOvVaw2mF5phXPK2oCWakvaPH0qP&ust=1694796949087000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKCRyuPIqoEDFQAAAAAdAAAAABAE',
        },
      ],
    },
  ];

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

  const onPressModal = (id: string) => {
    switch (id) {
      case 'swap':
        navigation.navigate('ImproveScore', {products: productSelected});
        break;

      case 'edit':
        break;
    }

    setIsVisibleModalEdit(false);
  };

  return (
    <Container
      right={
        <Button
          onPress={() => setIsVisibleModalEdit(true)}
          icon={
            <Feather name="more-vertical" size={22} color={appColors.gray} />
          }
        />
      }>
      <SectionComponent>
        <RowComponent justify="flex-start">
          <TitleComponent
            text="Your Grocery List"
            size={32}
            flex={0}
            height={32}
          />
          <SpaceComponent width={8} />
          <Button
            icon={
              <AntDesign name="infocirlceo" size={20} color={appColors.gray} />
            }
            onPress={() => {}}
          />
        </RowComponent>
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
      </View>

      <View style={{flex: 1}}>
        <SectionList
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
              onSelecteItem={(count: number) => handleAddProduct(item, count)}
              onRemoveItem={() => handleRemoveItem(item)}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <View style={{paddingHorizontal: 16}}>
              <TitleComponent text={title} size={14} font={fontFamilys.bold} />
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
            color="#13917B"
            fontStyles={{fontFamily: fontFamilys.bold, fontSize: 14}}
            textColor={appColors.white}
            text="COMPLETE MY LIST"
            onPress={() => {}}
          />
        </View>
      </RowComponent>

      <ModalizeEditShopList
        visible={isVisibleModalEdit}
        onClose={() => setIsVisibleModalEdit(false)}
        onPress={(id: string) => onPressModal(id)}
      />
    </Container>
  );
};

export default GroceryScreen;
