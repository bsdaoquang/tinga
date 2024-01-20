import AsyncStorage from '@react-native-async-storage/async-storage';
import {addGroceryList} from '../redux/reducers/groceryReducer';
import {appInfos} from '../constants/appInfos';
import {Product, ProductDetail} from '../Models/Product';
import {Category} from '../Models/Category';
import handleGetData from '../apis/productAPI';

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
    }
  };

  static syncDataToDatabase = async () => {
    const res = await AsyncStorage.getItem(appInfos.localDataName.groceryList);

    if (res) {
      const grocecyList = JSON.parse(res);

      const api = `/addListToGrocery`;
      if (grocecyList && grocecyList.length > 0) {
        let product_id = ``;
        let shop_id = ``;
        let qty = ``;

        grocecyList.forEach((product: any, index: number) => {
          if (product.id && product.shop_id) {
            product_id += `${product.id}${
              index < grocecyList.length - 1 ? ', ' : ''
            }`;
            shop_id += `${product.shop_id}${
              index < grocecyList.length - 1 ? ', ' : ''
            }`;
            qty += `${product.qty ?? 1}${
              index < grocecyList.length - 1 ? ', ' : ''
            }`;
          }
        });

        console.log(product_id, shop_id, qty);

        if (product_id && shop_id) {
          const data = new FormData();
          data.append('product_id', product_id);
          data.append('shop_id', shop_id);
          data.append('qty', qty);

          try {
            const res: any = await handleGetData.handleProduct(
              api,
              data,
              'post',
              true,
            );

            console.log(res);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log('Can not get data');
        }
      }
    }
  };
}
