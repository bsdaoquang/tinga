import {createSlice} from '@reduxjs/toolkit';
import {GroceryItem, ProductDetail} from '../../Models/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appInfos} from '../../constants/appInfos';
import {HandleGrocery} from '../../utils/handleGrocery';

const initialState: {
  groceries: ProductDetail[];
} = {
  groceries: [],
};

const uploadAsyncStorage = async (data: ProductDetail[]) => {
  await AsyncStorage.setItem(
    appInfos.localDataName.groceryList,
    JSON.stringify(data),
  );

  await HandleGrocery.syncDataToDatabase();
};

const grocerySlice = createSlice({
  name: 'groceryList',
  initialState,
  reducers: {
    addGroceryList: (state, action) => {
      state.groceries = action.payload;
    },
    updateGroceryList: (state, action) => {
      const item = action.payload;
      const groceries = state.groceries;
      const items = [...groceries];

      const index = items.findIndex(
        element => element.id === item.id && element.shop_id === item.shop_id,
      );

      if (index !== -1) {
        items.splice(index, 1);
      } else {
        items.push(item);
      }

      state.groceries = items;
      uploadAsyncStorage(items);
    },

    updateQuatity: (state, action) => {
      const {item, qty} = action.payload;
      const groceries = state.groceries;
      const data = [...groceries];
      const index = data.findIndex(element => element.id === item.id);
      if (index !== -1) {
        data[index].qty = qty;

        state.groceries = data;
        uploadAsyncStorage(data);
      }
    },
  },
});

export const groceryReducer = grocerySlice.reducer;
export const {addGroceryList, updateGroceryList, updateQuatity} =
  grocerySlice.actions;
//selector
export const groceriesSelector = (state: any) => state.groceryReducer.groceries;
