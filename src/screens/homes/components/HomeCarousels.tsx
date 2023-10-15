import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {PERMISSIONS, check} from 'react-native-permissions';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {TourGuideZone, useTourGuideController} from 'rn-tourguide';
import {HistoryProduc} from '../../../Models/Product';
import handleGetData from '../../../apis/productAPI';
import {
  ButtonComponent,
  CardContent,
  CustomIcon,
  RowComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilys} from '../../../constants/fontFamily';
import {global} from '../../../styles/global';

const HomeCarousels = () => {
  const [isPermission, setIsPermission] = useState(false);
  const [historiesList, setHistoriesList] = useState<HistoryProduc[]>([]);
  const [isGuideStart, setIsGuideStart] = useState(false);
  const isFocused = useIsFocused();

  const navigation: any = useNavigation();

  const {canStart, start, stop} = useTourGuideController();

  useEffect(() => {
    getHistoriesListOfProduct();
  }, []);

  useEffect(() => {
    if (isFocused) {
      // canStart && start();
      !isPermission && historiesList.length === 0 && canStart && start();
    } else {
      stop();
    }
  }, [canStart, isPermission, isFocused]);

  useEffect(() => {
    requestPermision();
  }, []);

  const requestPermision = async () => {
    check(PERMISSIONS.ANDROID.CAMERA).then(res => {
      if (res === 'granted') {
        setIsPermission(true);
      } else {
        setIsGuideStart(false);
      }
    });
  };

  const getHistoriesListOfProduct = async () => {
    const api = `/listOfProducts`;

    await handleGetData
      .handleProduct(api, {}, 'post')
      .then((res: any) => {
        setHistoriesList(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return historiesList.length > 5 ? (
    <CardContent styles={{margin: 16, paddingVertical: 23}}>
      <TitleComponent
        size={20}
        text="Start your Gluten-free shopping experience"
      />
      <SpaceComponent height={20} />
      {historiesList.length > 0 ? (
        <RowComponent justify="space-around">
          <ButtonComponent
            styles={{paddingVertical: 10}}
            icon={
              <View
                style={{
                  backgroundColor: 'rgba(65, 57, 62, 0.50);',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 60,
                  padding: 4,
                }}>
                <Ionicons name="add" size={22} color={appColors.white} />
              </View>
            }
            onPress={() => navigation.navigate('Grocery List')}
            text="NEW LIST"
            color={appColors.primary1}
            textColor={appColors.white}
          />

          <RowComponent onPress={() => navigation.navigate('ShopingHistory')}>
            <Octicons color={appColors.primary1} size={22} name="history" />
            <SpaceComponent width={8} />
            <TitleComponent
              text="VIEW HISTORY"
              color={appColors.primary1}
              flex={0}
            />
          </RowComponent>
        </RowComponent>
      ) : (
        <>
          <ButtonComponent
            styles={{paddingVertical: 10}}
            icon={
              <View
                style={{
                  backgroundColor: 'rgba(65, 57, 62, 0.50);',
                  // width: 24,
                  // height: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 60,
                  padding: 4,
                }}>
                <Ionicons name="add" size={22} color={appColors.white} />
              </View>
            }
            onPress={() => navigation.navigate('Grocery List')}
            text="NEW LIST"
            color={appColors.primary1}
            textColor={appColors.white}
          />
        </>
      )}
    </CardContent>
  ) : (
    <Swiper
      scrollEnabled={!isGuideStart}
      activeDotColor="#13917B"
      activeDotStyle={{
        width: 32,
      }}
      dotColor={`#13917B66`}
      loop={false}
      autoplay={false}
      horizontal
      showsPagination
      style={{flex: 0, height: 230, paddingVertical: 16}}>
      <TourGuideZone
        zone={0}
        style={{paddingBottom: 30}}
        borderRadius={16}
        text="START HERE"
        shape={'rectangle_and_keep'}>
        <CardContent styles={{marginHorizontal: 8}}>
          <TitleComponent
            text="Step 1 - Reset Your Pantry"
            flex={0}
            size={20}
          />
          <TextComponent
            text={`Scan to learn which foods match your\ndietary restrictions and what to swap.`}
            flex={0}
          />
          <SpaceComponent height={16} />
          <ButtonComponent
            disable={1 > 2 ? true : false}
            onPress={() => {
              stop();
              navigation.navigate('HomeScan');
            }}
            text="Scan my food"
            icon={
              <Ionicons
                name="barcode-outline"
                size={24}
                color={appColors.white}
              />
            }
            color={appColors.success}
            textColor={appColors.white}
          />
        </CardContent>
      </TourGuideZone>
      <CardContent styles={{marginHorizontal: 8}}>
        <TitleComponent
          text={'Step 2 - Create your first\ngrocery list'}
          flex={0}
          size={20}
        />
        <TextComponent text="" flex={0} />
        <SpaceComponent height={16} />
        <ButtonComponent
          onPress={() => navigation.navigate('Grocery List')}
          text="START LIST"
          color={appColors.success}
          textColor={appColors.white}
        />
      </CardContent>
      <CardContent isShadow={false} styles={{marginHorizontal: 8}}>
        <TitleComponent
          text={`Start your Gluten-free shopping experience`}
          size={20}
          flex={0}
        />

        <TextComponent text="" flex={0} />
        <SpaceComponent height={16} />
        <RowComponent justify="space-between">
          <ButtonComponent
            onPress={() => navigation.navigate('Grocery List')}
            styles={{paddingVertical: 12}}
            flex={1}
            textColor={appColors.white}
            icon={
              <CustomIcon
                icon={<Ionicons name="add" size={20} color={appColors.white} />}
              />
            }
            color={appColors.success}
            font={fontFamilys.bold}
            text="NEW LIST"
          />
          {historiesList.length > 0 && (
            <TouchableOpacity
              onPress={() => navigation.navigate('ShopingHistory')}
              style={[
                global.row,
                {flex: 1, justifyContent: 'center', alignItems: 'center'},
              ]}>
              <MaterialIcons
                name="history"
                size={22}
                color={appColors.success}
              />
              <SpaceComponent width={4} />
              <TitleComponent
                text="VIEW HISTORY"
                color={appColors.success}
                flex={0}
              />
            </TouchableOpacity>
          )}
        </RowComponent>
      </CardContent>
    </Swiper>
  );
};

export default HomeCarousels;
