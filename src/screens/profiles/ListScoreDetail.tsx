import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import handleGetData from '../../apis/productAPI';
import {
  ButtonComponent,
  Container,
  ImageProduct,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {DateTime} from '../../utils/DateTime';
import RenderListDetail from '../../components/RenderListDetail';
import {showToast} from '../../utils/showToast';
import {LoadingModal} from '../../modals';
import {useDispatch} from 'react-redux';
import {updateGroceryList} from '../../redux/reducers/groceryReducer';

const ListScoreDetail = ({navigation, route}: any) => {
  const {id, item} = route.params;

  const [dataScore, setDataScore] = useState<any[]>([]);
  const [shops, setShops] = useState<
    {
      name: string;
      qty: number;
    }[]
  >([]);
  const [selectedItems, setSelectedItems] = useState<
    {id: number; shop_id: number}[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    id && getScoreDetailById();
  }, [id]);

  useEffect(() => {
    const items: {
      name: string;
      qty: number;
    }[] = [];
    if (dataScore.length > 0) {
      dataScore.forEach(item => {
        const index = items.findIndex(
          element => element.name === item.shopname,
        );
        if (index !== -1) {
          items[index].qty += item.qty;
        } else {
          items.push({
            name: item.shopname,
            qty: item.qty,
          });
        }
      });

      setShops(items);
    }
  }, [dataScore]);

  const getScoreDetailById = async () => {
    const api = `/groceryListById?id=${id}`;
    setIsLoading(true);
    try {
      const res: any = await handleGetData.handleProduct(api);
      if (res && res.length > 0) {
        setDataScore(res);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleMoveToList = async () => {
    selectedItems.forEach(item => {
      const data: any = {...item};
      data.id = item.id;
      dispatch(updateGroceryList(data));
    });
    showToast('Product added to list!');
    setSelectedItems([]);
  };

  const handleSelectItem = (item: any) => {
    const items = [...selectedItems];

    const index = items.findIndex(
      element => element.id === item.id && element.shop_id === item.shop_id,
    );

    if (index !== -1) {
      items.splice(index, 1);
    } else {
      items.push({
        id: item.id,
        shop_id: item.shop_id,
      });
    }

    setSelectedItems(items);
    console.log(items);
  };

  return (
    <Container>
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
              text={DateTime.getDateString(item.created_at)}
              flex={0}
            />
          </View>
          <ButtonComponent
            text="Add to List"
            onPress={handleMoveToList}
            disable={selectedItems.length === 0}
            disableColor={appColors.gray4}
            color={appColors.primary}
            textColor={appColors.white}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{flex: 1}}>
        {dataScore.length > 0 ? (
          <RenderListDetail
            items={dataScore}
            onSelect={item => handleSelectItem(item)}
            selectedItems={selectedItems}
          />
        ) : (
          <LoadingComponent isLoading={isLoading} value={dataScore.length} />
        )}
      </SectionComponent>
      <LoadingModal visible={isUpdating} />
    </Container>
  );
};

export default ListScoreDetail;
