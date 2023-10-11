import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {appColors} from '../constants/appColors';
import {appInfos} from '../constants/appInfos';
import {addAuth} from '../redux/reducers/authReducer';
import {addLocalData} from '../redux/reducers/groceryReducer';
import {addFromLocal, addList} from '../redux/reducers/shopingListReducer';
import {global} from '../styles/global';

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
      console.log(items);
      // dispatch(addFromLocal(items));
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
