import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {
  Container,
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {HistoryProduc} from '../../Models/Product';
import FastImage from 'react-native-fast-image';
import {appColors} from '../../constants/appColors';

const HistoryListDetail = ({navigation, route}: any) => {
  const {
    items,
  }: {
    items: {
      date: string;
      data: HistoryProduc[];
    };
  } = route.params;

  console.log(items);
  return (
    <Container back>
      <SectionComponent>
        <TitleComponent text={items.date} flex={0} />
        <TitleComponent text={`Shopping List`} size={32} flex={0} />
        <FlatList
          data={items.data}
          renderItem={({item}) => (
            <RowComponent styles={{paddingVertical: 12}}>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  marginRight: 12,
                }}
                source={{uri: item.image}}
              />
              <TextComponent text={item.name} />
              <TextComponent
                text={`${item.qty} pcs`}
                size={14}
                color={appColors.gray}
                flex={0}
              />
            </RowComponent>
          )}
        />
      </SectionComponent>
    </Container>
  );
};

export default HistoryListDetail;
