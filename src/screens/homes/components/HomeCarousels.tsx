import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  CardContent,
  CustomIcon,
  RowComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../../components';
import {useSelector} from 'react-redux';
import {groceriesSelector} from '../../../redux/reducers/groceryReducer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {appColors} from '../../../constants/appColors';
import {useNavigation} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import Swiper from 'react-native-swiper';
import {fontFamilys} from '../../../constants/fontFamily';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {global} from '../../../styles/global';
import {PERMISSIONS, check} from 'react-native-permissions';
import {TourGuideZone, useTourGuideController} from 'rn-tourguide';

const HomeCarousels = () => {
  const [isPermission, setIsPermission] = useState(false);

  const groceriesList = useSelector(groceriesSelector);
  const navigation: any = useNavigation();

  const {canStart, start, stop} = useTourGuideController();

  console.log(groceriesList);

  useEffect(() => {
    !isPermission && groceriesList.length === 0 && canStart && start();
  }, [canStart, isPermission]);

  useEffect(() => {
    requestPermision();
  }, []);

  const requestPermision = async () => {
    check(PERMISSIONS.ANDROID.CAMERA).then(res => {
      if (res === 'granted') {
        setIsPermission(true);
      } else {
        setIsPermission(false);
      }
    });
  };

  return 1 > 2 ? (
    <CardContent styles={{margin: 16, paddingVertical: 23}}>
      <TitleComponent
        size={20}
        text="Start your Gluten-free shopping experience"
      />
      <SpaceComponent height={20} />
      {groceriesList.length > 0 ? (
        <RowComponent justify="space-around">
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
        zone={1}
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
            text="Scan to learn which foods match your dietary restrictions and what to swap."
            flex={0}
          />
          <SpaceComponent height={16} />
          <ButtonComponent
            disable={groceriesList.length > 0 ? true : false}
            onPress={() => {
              stop();
              navigation.navigate('BarCodeScreen');
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
          text="Step 2 - Create your first  grocery list"
          flex={0}
          size={20}
        />
        <TextComponent text="" flex={0} />
        <SpaceComponent height={16} />
        <ButtonComponent
          onPress={() => navigation.navigate('ShopingHistory')}
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
            onPress={() => {}}
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

          <TouchableOpacity
            style={[
              global.row,
              {flex: 1, justifyContent: 'center', alignItems: 'center'},
            ]}>
            <MaterialIcons name="history" size={22} color={appColors.success} />
            <SpaceComponent width={4} />
            <TitleComponent
              text="VIEW HISTORY"
              color={appColors.success}
              flex={0}
            />
          </TouchableOpacity>
        </RowComponent>
      </CardContent>
    </Swiper>
  );
};

export default HomeCarousels;
