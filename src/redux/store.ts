import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/authReducer';
//store
const store = configureStore({
  reducer: {
    authReducer,
  },
});

export default store;
