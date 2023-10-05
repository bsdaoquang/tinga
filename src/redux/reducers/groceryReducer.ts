import {createSlice} from '@reduxjs/toolkit';

const grocerySlice = createSlice({
  name: 'groceryList',
  initialState: {
    groceries: [],
  },
  reducers: {
    addLocalData: (state, action) => {
      state.groceries = action.payload;
    },
    addGroceries: (state, action) => {
      const items: any = state.groceries;

      const item = action.payload;
      if (item) {
        items.push(item);
        state.groceries = items;
      }
    },
    removeList: state => {
      state.groceries = [];
    },
  },
});

export const groceryReducer = grocerySlice.reducer;
export const {addGroceries, removeList, addLocalData} = grocerySlice.actions;
//selector
export const groceriesSelector = (state: any) => state.groceryReducer.groceries;
