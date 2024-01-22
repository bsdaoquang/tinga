import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/authReducer';
import {groceryReducer} from './reducers/groceryReducer';
import {selectedReducer} from './reducers/selectedReducer';
//store
const store = configureStore({
  reducer: {
    authReducer,
    groceryReducer,
    selectedReducer,
  },
});

export default store;
