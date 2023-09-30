import {ArrowRight2} from 'iconsax-react-native';
import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {Product} from '../../Models/Product';
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
import {shopingListSelector} from '../../redux/reducers/shopingListReducer';
import {DateTime} from '../../utils/DateTime';

const ShopingHistory = ({navigation}: any) => {
  const [shopingHistories, setShopingHistories] =
    useState<{date: number; data: Product[]}[]>();

  const data: {
    date: number;
    data: Product[];
  }[] = useSelector(shopingListSelector);

  const renderCardHistory = (item: {date: number; data: Product[]}) => (
    <CardContent color={appColors.white} isShadow styles={{marginBottom: 16}}>
      <RowComponent onPress={() => {}}>
        <TextComponent
          text={DateTime.getDateString(new Date(item.date).toISOString())}
        />
        <Button
          onPress={() => {}}
          icon={<ArrowRight2 size={18} color={appColors.gray} />}
        />
      </RowComponent>
      <SpaceComponent height={16} />
      <FlatList
        ListHeaderComponent={
          <ChartPieItem
            total={67}
            size={40}
            fontSize={18}
            data={{values: [53, 21, 15]}}
            radius={0.9}
          />
        }
        data={item.data}
        renderItem={({item, index}) => (
          <ImageProduct
            key={`image${index}`}
            imageUrl={item.image}
            styles={{marginLeft: 8}}
          />
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
        {data.map(item => renderCardHistory(item))}
      </SectionComponent>
    </Container>
  );
};

export default ShopingHistory;
