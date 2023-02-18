import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  parseToken,
  postAuthorizationCode,
} from '../../services/snackchat-api/getToken';

const initialState = {
  refreshToken: null,
  accessToken: null,
  status: 'Default',
  parseToken: {
    user_id: -1,
    email: 'none',
    exp: 0,
    iat: 0,
    jti: '',
    nickname: 'none',
    token_type: 'none',
  },
};

const asyncGetToken = createAsyncThunk(
  'getTokenReducer/asyncGetToken',
  async (code: string) => {
    const resp = await postAuthorizationCode({
      authorizationCode: code,
    });
    return resp;
  },
);

const getTokenSlice = createSlice({
  name: 'getToken',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetToken.pending, (state) => {
      state.status = 'Loading';
    });
    builder.addCase(asyncGetToken.fulfilled, (state, action) => {
      state.refreshToken = action.payload.refresh;
      state.accessToken = action.payload.access;
      state.parseToken = parseToken(action.payload.access);
      state.status = 'Complete';
    });
    builder.addCase(asyncGetToken.rejected, (state) => {
      state.status = 'Fail';
    });
  },
});

export default getTokenSlice;
export { asyncGetToken };
