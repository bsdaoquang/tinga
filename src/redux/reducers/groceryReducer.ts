import {createSlice} from '@reduxjs/toolkit';
import {GroceryItem} from '../../Models/Product';

const initialState: {
  groceries: GroceryItem[];
} = {
  groceries: [],
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

      const catIndex = groceries.findIndex(
        element => element.category_id === item.category_id,
      );
      if (catIndex) {
        const products = groceries[catIndex].products;

        const index = products.findIndex(
          element => element.id === item.id && element.shop_id === item.shop_id,
        );

        if (index !== -1) {
          products.splice(index, 1);
          groceries[catIndex].products = products;
        }
      }

      state.groceries = groceries;
    },
  },
});

export const groceryReducer = grocerySlice.reducer;
export const {addGroceryList, updateGroceryList} = grocerySlice.actions;
//selector
export const groceriesSelector = (state: any) => state.groceryReducer.groceries;
