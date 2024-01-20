import {ArrowRight2} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {HistoryProduc} from '../../Models/Product';
import handleGetData from '../../apis/productAPI';
import {
  Button,
  CardContent,
  ChartPieItem,
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

  useEffect(() => {
    getHistoriesListOfProduct();
  }, []);

  const getHistoriesListOfProduct = async () => {
    const api = `/groceryHistory`;

    await handleGetData
      .handleProduct(api)
      .then((res: any) => {
        setHistoriesList(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderCardHistory = (item: HistoryProduc) => (
    <CardContent
      color={appColors.white}
      isShadow
      styles={{marginBottom: 16}}
      key={`productGrocery${item.id}`}>
      <RowComponent
        onPress={() => navigation.navigate('HistoryListDetail', {items: item})}>
        <TextComponent text={DateTime.getDateString(item.created_at)} />
        <Button
          onPress={() =>
            navigation.navigate('HistoryListDetail', {items: item})
          }
          icon={<ArrowRight2 size={18} color={appColors.gray} />}
        />
      </RowComponent>
      <SpaceComponent height={16} />
      <FlatList
        keyExtractor={() => (Math.random() * 10000000).toFixed(1)}
        ListHeaderComponent={
          <ChartPieItem
            total={`${item.scoredetails.list_score}`}
            size={42}
            fontSize={18}
            data={{
              values: [
                item.scoredetails.green_line,
                item.scoredetails.orange_line,
                item.scoredetails.red_line,
              ],
            }}
            radius={0.9}
          />
        }
        data={item.products}
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
        {historiesList.map(item => renderCardHistory(item))}
      </SectionComponent>
    </Container>
  );
};

export default ShopingHistory;
