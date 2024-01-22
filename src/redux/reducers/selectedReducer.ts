import {createSlice} from '@reduxjs/toolkit';
import {GroceryItem, ProductDetail} from '../../Models/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appInfos} from '../../constants/appInfos';
import {HandleGrocery} from '../../utils/handleGrocery';

const initialState: {
  selected: ProductDetail[];
} = {
  selected: [],
};

const selectedSlice = createSlice({
  name: 'productsSelected',
  initialState,
  reducers: {
    addSelected: (state, action) => {
      state.selected = action.payload;
    },
    updateSelected: (state, action) => {
      const item = action.payload;
      const selected = state.selected;
      const items = [...selected];

      const index = items.findIndex(
        element => element.id === item.id && element.shop_id === item.shop_id,
      );

      if (index !== -1) {
        items.splice(index, 1);
      } else {
        const data = {...item};
        data.qyt = item.qty ? item.qty : 1;
        items.push(data);
      }

      state.selected = items;
    },
  },
});

export const selectedReducer = selectedSlice.reducer;
export const {updateSelected, addSelected} = selectedSlice.actions;
//selector
export const selectedSelector = (state: any) => state.selectedReducer.selected;
