import React, {useEffect, useState} from 'react';
import {FlatList, SectionList, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Product} from '../../Models/Product';
import {
  Button,
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

let currentOffset = 0;

const GroceryScreen = ({navigation}: any) => {
  const [store, setStore] = useState('all');
  const [directionScroll, setDirectionScroll] = useState('up');
  const [isShowScoreCard, setIsShowScoreCard] = useState(true);
  const [productSelected, setProductSelected] = useState<Product[]>([]);

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

    console.log(productSelected, items);
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
          title: 'Item 3',
          price: 2.99,
          imageUrl: '',
        },
      ],
    },
    {
      title: 'Bread & Bakery',
      data: [
        {
          id: '1',
          title: 'Bread',
          price: 4.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: '2',
          title: 'Item 1',
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
      ],
    },
    {
      title: 'Dairy & Alternatives',
      data: [
        {
          id: '1',
          title: 'Eggs',
          price: 4.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/067f/b679/e685e7d371157fcadb175e7a57321e65?Expires=1693785600&Signature=gGuSYvk0Lh4RLkHDl9g~lHmr2s33Eh5vvMt~6jbNK72CKevP1BdnG7XwJFuf2xW8fm3cnly-rqQ6YeFNmYP~cQO02bggHIFnR1Ze57tcQWKr~gwvq3zMR-LCuDj0ov3x-yqJWnlJfVe4dCgsQ2nfeFuZJHlvxcFPZpPdoNNbb4sWdC9CvvmsWYG6A~K~4zB2AovPNKzfHPV6hW44BorH070GNI0mAAQgAwym5QC6u7juuCizmbpFIUm5TrcWy-6StKCUGpKmqi9DkmxpLXgzGH57yf2EbIZ3np2CL5Z9OpkSFSuGu1OhJbPVZ044m~4CHSYxGXx4xrd0kHHs8aQejg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: '2',
          title: 'Item 2',
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/067f/b679/e685e7d371157fcadb175e7a57321e65?Expires=1693785600&Signature=gGuSYvk0Lh4RLkHDl9g~lHmr2s33Eh5vvMt~6jbNK72CKevP1BdnG7XwJFuf2xW8fm3cnly-rqQ6YeFNmYP~cQO02bggHIFnR1Ze57tcQWKr~gwvq3zMR-LCuDj0ov3x-yqJWnlJfVe4dCgsQ2nfeFuZJHlvxcFPZpPdoNNbb4sWdC9CvvmsWYG6A~K~4zB2AovPNKzfHPV6hW44BorH070GNI0mAAQgAwym5QC6u7juuCizmbpFIUm5TrcWy-6StKCUGpKmqi9DkmxpLXgzGH57yf2EbIZ3np2CL5Z9OpkSFSuGu1OhJbPVZ044m~4CHSYxGXx4xrd0kHHs8aQejg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
      ],
    },
    {
      title: 'Produce',
      data: [
        {
          id: '1',
          title: 'Item 3',
          price: 2.99,
          imageUrl: '',
        },
      ],
    },
    {
      title: 'Bread & Bakery',
      data: [
        {
          id: '1',
          title: 'Bread',
          price: 4.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: '2',
          title: 'Item 1',
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
      ],
    },
    {
      title: 'Dairy & Alternatives',
      data: [
        {
          id: '1',
          title: 'Eggs',
          price: 4.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/067f/b679/e685e7d371157fcadb175e7a57321e65?Expires=1693785600&Signature=gGuSYvk0Lh4RLkHDl9g~lHmr2s33Eh5vvMt~6jbNK72CKevP1BdnG7XwJFuf2xW8fm3cnly-rqQ6YeFNmYP~cQO02bggHIFnR1Ze57tcQWKr~gwvq3zMR-LCuDj0ov3x-yqJWnlJfVe4dCgsQ2nfeFuZJHlvxcFPZpPdoNNbb4sWdC9CvvmsWYG6A~K~4zB2AovPNKzfHPV6hW44BorH070GNI0mAAQgAwym5QC6u7juuCizmbpFIUm5TrcWy-6StKCUGpKmqi9DkmxpLXgzGH57yf2EbIZ3np2CL5Z9OpkSFSuGu1OhJbPVZ044m~4CHSYxGXx4xrd0kHHs8aQejg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: '2',
          title: 'Item 2',
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/067f/b679/e685e7d371157fcadb175e7a57321e65?Expires=1693785600&Signature=gGuSYvk0Lh4RLkHDl9g~lHmr2s33Eh5vvMt~6jbNK72CKevP1BdnG7XwJFuf2xW8fm3cnly-rqQ6YeFNmYP~cQO02bggHIFnR1Ze57tcQWKr~gwvq3zMR-LCuDj0ov3x-yqJWnlJfVe4dCgsQ2nfeFuZJHlvxcFPZpPdoNNbb4sWdC9CvvmsWYG6A~K~4zB2AovPNKzfHPV6hW44BorH070GNI0mAAQgAwym5QC6u7juuCizmbpFIUm5TrcWy-6StKCUGpKmqi9DkmxpLXgzGH57yf2EbIZ3np2CL5Z9OpkSFSuGu1OhJbPVZ044m~4CHSYxGXx4xrd0kHHs8aQejg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
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

  return (
    <Container
      right={<Feather name="more-vertical" size={22} color={appColors.gray} />}>
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
                onPress={() => {}}
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
            totalItem: productSelected.length,
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
    </Container>
  );
};

export default GroceryScreen;
