import {ArrowRight2} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {HistoryProduc} from '../../Models/Product';
import handleGetData from '../../apis/productAPI';
import {
  Button,
  CardContent,
  Container,
  ImageProduct,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {DateTime} from '../../utils/DateTime';

const ShopingHistory = ({navigation}: any) => {
  const [historiesList, setHistoriesList] = useState<HistoryProduc[]>([]);
  const [dataHistories, setDataHistories] = useState<
    {
      date: string;
      data: HistoryProduc[];
    }[]
  >([]);

  useEffect(() => {
    getHistoriesListOfProduct();
  }, []);

  useEffect(() => {
    const dataList: {date: string; data: HistoryProduc[]}[] = [];
    if (historiesList.length > 0) {
      historiesList.forEach(item => {
        const date = DateTime.getDateString(
          new Date(item.created_on).toISOString(),
        );

        const index = dataList.findIndex(element => element.date === date);

        index === -1 &&
          dataList.push({
            date,
            data: historiesList.filter(
              element =>
                DateTime.getDateString(
                  new Date(element.created_on).toISOString(),
                ) === date,
            ),
          });
      });
    }

    setDataHistories(dataList);
  }, [historiesList]);

  const getHistoriesListOfProduct = async () => {
    const api = `/listOfProducts`;

    await handleGetData
      .handleProduct(api, {}, 'post')
      .then((res: any) => {
        setHistoriesList(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   dataHistories.map(itemHis => {
  //     itemHis.data.forEach(item => {
  //       console.log(item);
  //     });
  //   });
  // }, [dataHistories]);

  const renderCardHistory = (
    items: {date: string; data: HistoryProduc[]},
    indexlist: number,
  ) => (
    <CardContent
      color={appColors.white}
      isShadow
      styles={{marginBottom: 16}}
      key={`shoping${indexlist}`}>
      <RowComponent
        onPress={() =>
          navigation.navigate('HistoryListDetail', {items: items})
        }>
        <TextComponent text={items.date} />
        <Button
          onPress={() =>
            navigation.navigate('HistoryListDetail', {items: items})
          }
          icon={<ArrowRight2 size={18} color={appColors.gray} />}
        />
      </RowComponent>
      <SpaceComponent height={16} />
      <FlatList
        keyExtractor={() => (Math.random() * 10000000).toFixed(1)}
        ListHeaderComponent={
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#E6EECC',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              marginRight: 6,
            }}>
            <TextComponent text="👍" size={16} flex={0} />
          </View>
        }
        data={items.data}
        renderItem={({item, index}) => (
          <ImageProduct imageUrl={item.image} styles={{marginLeft: 8}} />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </CardContent>
  );

  return (
    <Container back isScroll>
      <SectionComponent>
        <TitleComponent text="Grocery List History" size={32} />
        <SpaceComponent height={12} />
        {dataHistories.map((item, index) => renderCardHistory(item, index))}
      </SectionComponent>
    </Container>
  );
};

export default ShopingHistory;
