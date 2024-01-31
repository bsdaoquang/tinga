import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {ProductDetail} from '../../Models/Product';
import {Recipe} from '../../Models/Recipe';
import {appInfos} from '../../constants/appInfos';
import {HandleGrocery} from '../../utils/handleGrocery';
import {HandleFavourites} from '../../utils/handleFavourites';

const initialState: {
  favouries: Recipe[];
} = {
  favouries: [],
};

const uploadAsyncStorage = async (data: Recipe[]) => {
  await AsyncStorage.setItem(
    appInfos.localDataName.favourites,
    JSON.stringify(data),
  );

  await HandleFavourites.syncDatabase();
};

const favouritesRecipeSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavouries: (state, action) => {
      state.favouries = action.payload;
      // uploadAsyncStorage(action.payload);
    },
    updateFavourites: (state, action) => {
      const item = action.payload;
      const recipes = state.favouries;
      const items = [...recipes];
      const index = items.findIndex(element => element.id === item.id);
      if (index !== -1) {
        items.splice(index, 1);
      } else {
        items.push(item);
      }
      state.favouries = items;
      uploadAsyncStorage(items);
    },
  },
});

export const favouriesReducer = favouritesRecipeSlice.reducer;
export const {addFavouries, updateFavourites} = favouritesRecipeSlice.actions;
//selector
export const favouritesSelector = (state: any) =>
  state.favouriesReducer.favouries;
