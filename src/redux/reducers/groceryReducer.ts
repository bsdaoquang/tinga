import {createSlice} from '@reduxjs/toolkit';

const grocerySlice = createSlice({
  name: 'groceryList',
  initialState: {
    groceries: [],
  },
  reducers: {
    addGroceries: (state, action) => {
      const items: any = state.groceries;
      const item = action.payload;

      items.push(item);
      state.groceries = items;
    },
  },
});

export const groceryReducer = grocerySlice.reducer;
export const {addGroceries} = grocerySlice.actions;
//selector
export const groceriesSelector = (state: any) => state.groceryReducer.groceries;
