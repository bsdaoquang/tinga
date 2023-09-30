import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/authReducer';
import {groceryReducer} from './reducers/groceryReducer';
//store
const store = configureStore({
  reducer: {
    authReducer,
    groceryReducer,
  },
});

export default store;
