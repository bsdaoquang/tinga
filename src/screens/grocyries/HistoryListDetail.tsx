import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  ButtonComponent,
  Container,
  ImageProduct,
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {DateTime} from '../../utils/DateTime';

const HistoryListDetail = ({navigation, route}: any) => {
  const {items} = route.params;
  const [shops, setShops] = useState<{name: string; qty: number}[]>([]);

  useEffect(() => {
    const data: {
      name: string;
      qty: number;
    }[] = [];
    if (items.products.length > 0) {
      items.products.forEach((item: any) => {
        const index = data.findIndex(element => element.name === item.shopname);
        if (index !== -1) {
          data[index].qty += item.qty;
        } else {
          data.push({
            name: item.shopname,
            qty: item.qty,
          });
        }
      });

      setShops(data);
    }
  }, [items]);

  return (
    <Container paddingBottom={0}>
      <SectionComponent
        styles={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <TouchableOpacity>
          <MaterialIcons name="more-vert" size={22} color={appColors.gray} />
        </TouchableOpacity>
      </SectionComponent>
      <SectionComponent>
        <TitleComponent size={28} text="Grocery List" flex={0} />
        <TextComponent
          text={DateTime.getDateString(items.created_at)}
          flex={0}
        />
      </SectionComponent>
      <SectionComponent styles={{flex: 1}}>
        <>
          <FlatList
            style={{
              flex: 1,
            }}
            ListHeaderComponent={
              <RowComponent justify="flex-start" styles={{paddingVertical: 12}}>
                {shops.map(shop => (
                  <View
                    key={shop.name}
                    style={{
                      marginRight: 12,
                      backgroundColor: appColors.success1,
                      paddingHorizontal: 16,
                      paddingVertical: 4,
                      borderRadius: 100,
                    }}>
                    <TextComponent
                      text={`${shop.name} ${shop.qty}`}
                      flex={0}
                      color={appColors.white}
                    />
                  </View>
                ))}
              </RowComponent>
            }
            data={items.products}
            renderItem={({item}) => (
              <RowComponent
                key={`product${item.id}`}
                styles={{
                  marginBottom: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ImageProduct imageUrl={item.image} />
                <View style={{flex: 1, paddingHorizontal: 12}}>
                  <TextComponent text={item.name} flex={0} />
                </View>
                <TextComponent text={`${item.qty} pcs`} flex={0} />
              </RowComponent>
            )}
          />

          <ButtonComponent
            styles={{flex: 0}}
            text="Back to Grocery List History"
            onPress={() => navigation.goBack()}
            textColor={appColors.white}
          />
        </>
      </SectionComponent>
    </Container>
  );
};

export default HistoryListDetail;
