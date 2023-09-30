import {createSlice} from '@reduxjs/toolkit';

const grocerySlice = createSlice({
  name: 'groceryList',
  initialState: {
    groceries: [],
  },
  reducers: {
    addGroceries: (state, action) => {
      state.groceries = action.payload;
    },
  },
});

export const groceryReducer = grocerySlice.reducer;
export const {addGroceries} = grocerySlice.actions;
//selector
export const groceriesSelector = (state: any) => state.groceryReducer.groceries;
