import {createSlice} from '@reduxjs/toolkit';
import {Product} from '../../Models/Product';

const initialState: {
  shopingList: {
    date: number;
    data: Product[];
  }[];
} = {
  shopingList: [],
};

const shopSlice = createSlice({
  name: 'shopingList',
  initialState: initialState,
  reducers: {
    // toggleItemShoping: (state, action) => {
    //   const items: Product[] = state.shopingList;
    //   const item: Product = action.payload;
    //   const index = items.findIndex(element => element.id === item.id);

    //   if (index !== -1) {
    //     items.push(item);
    //   } else {
    //     items.splice(index, 1);
    //   }

    //   state.shopingList = items;
    // },

    addList: (state, action) => {
      const items = state.shopingList;
      items.push({
        date: Date.now(),
        data: action.payload,
      });

      state.shopingList = items;
    },
    addFromLocal: (state, action) => {
      state.shopingList = action.payload;
    },
  },
});

export const shopingListReducer = shopSlice.reducer;
export const {addList, addFromLocal} = shopSlice.actions;
//selector
export const shopingListSelector = (state: any) =>
  state.shopingListReducer.shopingList;
