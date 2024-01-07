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

const ListScoreDetail = ({navigation, route}: any) => {
  const {id, item} = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [dataScore, setDataScore] = useState<any[]>([]);
  const [shops, setShops] = useState<
    {
      name: string;
      qty: number;
    }[]
  >([]);

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

  return (
    <Container>
      <SectionComponent
        styles={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <TouchableOpacity>
          <MaterialIcons name="more-vert" size={22} color={appColors.gray} />
        </TouchableOpacity>
      </SectionComponent>
      <SectionComponent>
        <TitleComponent size={28} text="Grocery List" flex={0} />
        <TextComponent
          text={DateTime.getDateString(item.created_at)}
          flex={0}
        />
      </SectionComponent>
      <SectionComponent styles={{flex: 1}}>
        {dataScore.length > 0 ? (
          <RenderListDetail items={dataScore} />
        ) : (
          <LoadingComponent isLoading={isLoading} value={dataScore.length} />
        )}
      </SectionComponent>
    </Container>
  );
};

export default ListScoreDetail;
