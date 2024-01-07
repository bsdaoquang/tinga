import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ButtonComponent, ImageProduct, RowComponent, TextComponent} from '.';
import {appColors} from '../constants/appColors';
import {useNavigation} from '@react-navigation/native';

interface Props {
  items: any;
}

const RenderListDetail = (props: Props) => {
  const {items} = props;
  const [shops, setShops] = useState<{name: string; qty: number}[]>([]);
  const [tabSelected, setTabSelected] = useState('all');

  const navigation: any = useNavigation();

  useEffect(() => {
    const data: {
      name: string;
      qty: number;
    }[] = [];
    if (items.length > 0) {
      items.forEach((item: any) => {
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
    <>
      <FlatList
        style={{
          flex: 1,
        }}
        ListHeaderComponent={
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginBottom: 16}}
            ListHeaderComponent={
              <TouchableOpacity
                onPress={() => setTabSelected('all')}
                key={'all'}
                style={{
                  marginRight: 12,
                  backgroundColor:
                    tabSelected === 'all' ? appColors.success1 : appColors.gray,
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                  borderRadius: 100,
                }}>
                <TextComponent
                  text={`All ${items.length}`}
                  flex={0}
                  color={appColors.white}
                />
              </TouchableOpacity>
            }
            data={shops}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => setTabSelected(item.name)}
                key={item.name}
                style={{
                  marginRight: 12,
                  backgroundColor:
                    tabSelected === item.name
                      ? appColors.success1
                      : appColors.gray,
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                  borderRadius: 100,
                }}>
                <TextComponent
                  text={`${item.name} ${item.qty}`}
                  flex={0}
                  color={appColors.white}
                />
              </TouchableOpacity>
            )}
          />
        }
        data={
          tabSelected === 'all'
            ? items
            : items.filter((element: any) => element.shopname === tabSelected)
        }
        showsVerticalScrollIndicator={false}
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
  );
};

export default RenderListDetail;
