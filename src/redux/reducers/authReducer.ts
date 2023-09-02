import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: {
      access_token: '',
      email: '',
      first_name: '',
      id: null,
      last_name: '',
      phone: null,
      token_type: '',
    },
  },
  reducers: {
    addAuth: (state, action) => {
      state.authData = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const {addAuth} = authSlice.actions;
//selector
export const authSelector = (state: any) => state.authReducer.authData;
