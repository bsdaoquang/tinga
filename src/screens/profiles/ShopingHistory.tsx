import {ArrowRight2} from 'iconsax-react-native';
import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Product} from '../../Models/Product';
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
import {shopingListSelector} from '../../redux/reducers/shopingListReducer';
import {DateTime} from '../../utils/DateTime';

const ShopingHistory = ({navigation}: any) => {
  const data: {
    date: number;
    data: Product[];
  }[] = useSelector(shopingListSelector);

  const renderCardHistory = (
    item: {date: number; data: Product[]},
    index: number,
  ) => (
    <CardContent
      color={appColors.white}
      isShadow
      styles={{marginBottom: 16}}
      key={`shoping${index}`}
    >
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
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#E6EECC',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              marginRight: 6,
            }}
          >
            <TextComponent text="👍" size={16} flex={0} />
          </View>
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
        {data.map((item, index) => renderCardHistory(item, index))}
      </SectionComponent>
    </Container>
  );
};

export default ShopingHistory;
