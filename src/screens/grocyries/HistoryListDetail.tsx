import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {
  ButtonComponent,
  Container,
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import RenderListDetail from '../../components/RenderListDetail';
import {appColors} from '../../constants/appColors';
import {LoadingModal} from '../../modals';
import {DateTime} from '../../utils/DateTime';
import {updateGroceryList} from '../../redux/reducers/groceryReducer';
import {showToast} from '../../utils/showToast';

const HistoryListDetail = ({navigation, route}: any) => {
  const {items} = route.params;
  const [shops, setShops] = useState<{name: string; qty: number}[]>([]);
  const [selectedItems, setSelectedItems] = useState<
    {id: number; shop_id: number}[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

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

  const handleMoveToList = async () => {
    selectedItems.forEach(item => {
      const data: any = {...item};
      data.id = item.id;
      dispatch(updateGroceryList(data));
    });
    setSelectedItems([]);
    showToast('Added to list!!!');
  };

  const handleSelectItem = (item: any) => {
    const items = [...selectedItems];
    const index = items.findIndex(
      element => element.id === item.id && element.shop_id === item.shop_id,
    );

    if (index !== -1) {
      items.splice(index, 1);
    } else {
      items.push(item);
    }

    setSelectedItems(items);
  };

  return (
    <Container paddingBottom={0}>
      <SectionComponent
        styles={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <TouchableOpacity>
          <MaterialIcons name="more-vert" size={22} color={appColors.gray} />
        </TouchableOpacity>
      </SectionComponent>
      <SectionComponent>
        <RowComponent>
          <View style={{flex: 1}}>
            <TitleComponent size={28} text="Grocery List" flex={0} />
            <TextComponent
              text={DateTime.getDateString(items.created_at)}
              flex={0}
            />
          </View>
          <ButtonComponent
            text="Add to List"
            // onPress={() => console.log()}
            onPress={handleMoveToList}
            disable={selectedItems.length === 0}
            disableColor={appColors.gray4}
            color={appColors.primary}
            textColor={appColors.white}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{flex: 1}}>
        <RenderListDetail
          items={items.products}
          onSelect={item => handleSelectItem(item)}
          selectedItems={selectedItems}
        />
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </Container>
  );
};

export default HistoryListDetail;
