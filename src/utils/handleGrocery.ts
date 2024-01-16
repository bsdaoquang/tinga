import AsyncStorage from '@react-native-async-storage/async-storage';
import {addGroceryList} from '../redux/reducers/groceryReducer';
import {appInfos} from '../constants/appInfos';
import {Product, ProductDetail} from '../Models/Product';
import {Category} from '../Models/Category';

export class HandleGrocery {
  static RemoveGrocery = async (dispatch: any) => {
    dispatch(addGroceryList([]));
    await AsyncStorage.removeItem(appInfos.localDataName.groceryList);
  };
  static UpdateList = async (
    item: Product,
    category: Category,
    dispatch: any,
  ) => {
    const res = await AsyncStorage.getItem(appInfos.localDataName.groceryList);
    if (res) {
      const groceries = JSON.parse(res);
      console.log(category);
    }
  };
}
