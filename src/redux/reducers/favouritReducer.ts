import {createSlice} from '@reduxjs/toolkit';
import {ProductDetail} from '../../Models/Product';

const favouritesSlice = createSlice({
  name: 'favouritesList',
  initialState: {
    favourites: [],
  },
  reducers: {
    addLocalDataFavorites: (state, action) => {
      state.favourites = action.payload;
    },
    addfavourites: (state, action) => {
      const items: any = state.favourites;

      const item = action.payload;
      if (item) {
        items.push(item);
        state.favourites = items;
      }
    },
    removeItem: (state, action) => {
      const items = state.favourites;
      const item = action.payload;
      const index = items.findIndex(
        (element: ProductDetail) => element.id === item.id,
      );

      if (index !== -1) {
        items.splice(index, 1);

        state.favourites = items;
      }
    },
    removeList: state => {
      state.favourites = [];
    },
  },
});

export const favouritesReducer = favouritesSlice.reducer;
export const {addfavourites, removeList, addLocalDataFavorites, removeItem} =
  favouritesSlice.actions;
//selector
export const favouritesSelector = (state: any) =>
  state.favouritesReducer.favourites;
