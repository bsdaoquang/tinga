import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  AddNewProduct,
  AddNewScreen,
  BarCodeScreen,
  CreatedItems,
  HistoryListDetail,
  HomeScan,
  ImproveScore,
  MyFavourites,
  PersionalInfomation,
  ReferralScreen,
  ShopingHistory,
  WebviewScreen,
} from '../screens';
import TabNavigator from './TabNavigator';
import {useNavigation} from '@react-navigation/native';
import {HandleLogin} from '../utils/HandleLogin';
import {useDispatch} from 'react-redux';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    HandleLogin.handleCheckUserLoginAgain(navigation, dispatch);
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeRoot" component={TabNavigator} />
      <Stack.Screen name="ShopingHistory" component={ShopingHistory} />
      <Stack.Screen name="ImproveScore" component={ImproveScore} />
      <Stack.Screen name="ReferralScreen" component={ReferralScreen} />
      <Stack.Screen name="WebviewScreen" component={WebviewScreen} />
      <Stack.Screen name="HomeScan" component={HomeScan} />
      <Stack.Screen name="BarCodeScreen" component={BarCodeScreen} />
      <Stack.Screen name="MyFavourites" component={MyFavourites} />
      <Stack.Screen name="HistoryListDetail" component={HistoryListDetail} />
      <Stack.Screen name="AddNewProduct" component={AddNewProduct} />
      <Stack.Screen name="AddNewScreen" component={AddNewScreen} />
      <Stack.Screen name="CreatedItems" component={CreatedItems} />
      <Stack.Screen
        name="PersionalInfomation"
        component={PersionalInfomation}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
