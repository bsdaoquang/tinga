import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/authReducer';
import {groceryReducer} from './reducers/groceryReducer';
import {selectedReducer} from './reducers/selectedReducer';
import {favouriesReducer} from './reducers/favouritesReducer';
//store
const store = configureStore({
  reducer: {
    authReducer,
    groceryReducer,
    selectedReducer,
    favouriesReducer,
  },
});

export default store;
