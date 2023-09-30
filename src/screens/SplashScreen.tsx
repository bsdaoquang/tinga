import React, {useEffect} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {appColors} from '../constants/appColors';
import {global} from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appInfos} from '../constants/appInfos';
import {useDispatch} from 'react-redux';
import {addAuth} from '../redux/reducers/authReducer';
import {addGroceries} from '../redux/reducers/groceryReducer';

const SplashScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUserData();
    getScanlist();
  }, []);

  const getUserData = async () => {
    const res = await AsyncStorage.getItem(appInfos.localDataName.userData);
    res && dispatch(addAuth(JSON.parse(res)));
  };
  const getScanlist = async () => {
    const res = await AsyncStorage.getItem(appInfos.localDataName.scanlist);
    res && dispatch(addGroceries(JSON.parse(res)));
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
