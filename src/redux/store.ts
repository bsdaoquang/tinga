import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/authReducer';
import {groceryReducer} from './reducers/groceryReducer';
import {shopingListReducer} from './reducers/shopingListReducer';
import {favouritesReducer} from './reducers/favouritReducer';
//store
const store = configureStore({
  reducer: {
    authReducer,
    groceryReducer,
    shopingListReducer,
    favouritesReducer,
  },
});

export default store;
