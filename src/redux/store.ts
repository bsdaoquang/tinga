import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/authReducer';
import {groceryReducer} from './reducers/groceryReducer';
import {shopingListReducer} from './reducers/shopingListReducer';
//store
const store = configureStore({
  reducer: {
    authReducer,
    groceryReducer,
    shopingListReducer,
  },
});

export default store;
