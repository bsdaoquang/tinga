import React, {useEffect} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {appColors} from '../constants/appColors';
import {global} from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appInfos} from '../constants/appInfos';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth} from '../redux/reducers/authReducer';
import {
  addGroceries,
  addLocalData,
  groceriesSelector,
} from '../redux/reducers/groceryReducer';
import {addList} from '../redux/reducers/shopingListReducer';

const SplashScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUserData();
    getScanlist();
    getShopingList();
  }, []);

  const getUserData = async () => {
    const res = await AsyncStorage.getItem(appInfos.localDataName.userData);
    res && dispatch(addAuth(JSON.parse(res)));
  };
  const getScanlist = async () => {
    // await AsyncStorage.removeItem(appInfos.localDataName.scanlist);

    const res = await AsyncStorage.getItem(appInfos.localDataName.scanlist);

    if (res && JSON.parse(res).length > 0) {
      const data = JSON.parse(res);

      dispatch(addLocalData(data));
    } else {
      console.log('Data not found');
    }
  };
  const getShopingList = async () => {
    const res = await AsyncStorage.getItem(appInfos.localDataName.shopingList);
    const items = res ? JSON.parse(res) : [];

    if (items.length > 0) {
      items.forEach((item: any) => dispatch(addList(item)));
    }
  };

  return (
    <View
      style={[
        global.container,
        {
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <Image
        source={require('../assets/images/TingaLogo.png')}
        style={{width: 175, height: 68, resizeMode: 'contain'}}
      />
      <ActivityIndicator size={24} color={appColors.gray} />
    </View>
  );
};

export default SplashScreen;
