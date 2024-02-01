import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import handleMealApi from '../apis/mealplannerAPI';
import handleGetData from '../apis/productAPI';
import {appInfos} from '../constants/appInfos';
import {
  addFavouries,
  favouritesSelector,
} from '../redux/reducers/favouritesReducer';
import {addGroceryList} from '../redux/reducers/groceryReducer';
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
import {HandleLogin} from '../utils/HandleLogin';
import TabNavigator from './TabNavigator';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const favourites = useSelector(favouritesSelector);

  useEffect(() => {
    HandleLogin.handleCheckUserLoginAgain(navigation, dispatch);
    getGroceryList();
    getDiets();
    getFavouritesList();
  }, []);

  const getDiets = async () => {
    const api = `/dietpreference`;

    try {
      const res: any = await handleGetData.handleProduct(api);

      if (res && res.length > 0) {
        const item = res.find((element: any) => element.is_selected === 'Yes');
        item &&
          (await AsyncStorage.setItem(
            appInfos.localDataName.dietType,
            `${item.id}`,
          ));
      }
    } catch (error) {
      console.log(`error ${error}`);
    }
  };

  const getGroceryList = async () => {
    const api = `/listOfProducts`;

    try {
      const res: any = await handleGetData.handleProduct(
        api,
        undefined,
        'post',
      );
      if (res && res.length > 0) {
        dispatch(addGroceryList(res));
      }
    } catch (error) {
      console.log(error);
    }
    // }
  };

  const getFavouritesList = async () => {
    const api = `listofFavouriteRecipe`;
    try {
      const res: any = await handleMealApi.handleMealPlanner(api);
      if (res && res.length > 0) {
        dispatch(addFavouries(res));
      } else {
        dispatch(addFavouries([]));
      }
    } catch (error) {
      console.log(`Can not get favourites recipes ${error}`);
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
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
