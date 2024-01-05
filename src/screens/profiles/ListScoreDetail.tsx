import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import handleGetData from '../../apis/productAPI';
import {
  Button,
  ButtonComponent,
  ButtonIcon,
  Container,
  ImageProduct,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {More, More2} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DateTime} from '../../utils/DateTime';

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
          <>
            <FlatList
              style={{
                flex: 1,
              }}
              ListHeaderComponent={
                <RowComponent
                  justify="flex-start"
                  styles={{paddingVertical: 12}}>
                  {shops.map(shop => (
                    <View
                      key={item.name}
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
              data={dataScore}
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
        ) : (
          <LoadingComponent isLoading={isLoading} value={dataScore.length} />
        )}
      </SectionComponent>
    </Container>
  );
};

export default ListScoreDetail;
