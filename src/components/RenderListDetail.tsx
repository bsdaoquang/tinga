import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {ButtonComponent, ImageProduct, RowComponent, TextComponent} from '.';
import {appColors} from '../constants/appColors';

interface Props {
  items: any;
  onSelect: (item: any) => void;
  selectedItems: {product_id: number; shop_id: number}[];
}

const RenderListDetail = (props: Props) => {
  const {items, selectedItems, onSelect} = props;
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

  const renderCheckBox = (item: any) => {
    const index = selectedItems.findIndex(
      element =>
        element.product_id === item.product_id &&
        element.shop_id === item.shop_id,
    );

    return (
      <CheckBox
        disabled
        lineWidth={1.0}
        tintColors={{true: appColors.success1, false: appColors.gray}}
        value={index !== -1}
      />
    );
  };

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
        renderItem={({item, index}) => (
          <RowComponent
            onPress={() => onSelect(item)}
            key={`product${item.id}`}
            styles={{
              marginBottom: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {renderCheckBox(item)}
            <ImageProduct imageUrl={item.image} />
            <View style={{flex: 1, paddingHorizontal: 12}}>
              <TextComponent text={item.name} flex={0} />
            </View>
            <TextComponent text={`${item.qty} ct`} flex={0} />
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
